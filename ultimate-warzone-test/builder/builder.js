/* Ultimate Warzone army builder.
 *
 * The data (data/<army>.js, written by tools/export.py) holds every card and rules entry already rendered; this
 * script only keeps the list, adds up the points, shows the chosen models and options, and collects the rules
 * entries the list uses. Rule checks never block a choice: they are listed as warnings at the bottom.
 */
(function () {
  "use strict";

  // Load-outs are bought per model (a count of models). Book p.141 says a load-out bought for a squad goes on
  // every viable model of that squad; set this to false for that reading.
  var LOADOUT_PER_MODEL = true;
  var STORE = "uwz-builder-list";

  var UWZ = window.UWZ;
  if (!UWZ || !UWZ.forces) {          // the source copy (site/builder/) has no data: tools/export.py writes it
    document.getElementById("setup").innerHTML = '<p class="warn">No army data found. Run <code>python tools/export.py</code> '
      + "and open build/site/builder/index.html.</p>";
    return;
  }
  var state = { army: "", force: "", limit: null, name: "", units: [] };
  var nextUid = 1;
  var $ = function (id) { return document.getElementById(id); };

  // ---- data loading (script tags, so the page also works opened from disk) -----------------------------------
  var loading = {};
  function loadArmy(a) {
    if (UWZ.armies[a]) return Promise.resolve(UWZ.armies[a]);
    if (loading[a]) return loading[a];
    loading[a] = new Promise(function (ok, fail) {
      var s = document.createElement("script");
      s.src = "data/" + a + ".js";
      s.onload = function () { ok(UWZ.armies[a]); };
      s.onerror = function () { fail(new Error("could not load data/" + a + ".js")); };
      document.head.appendChild(s);
    });
    return loading[a];
  }
  function forcesOf(a) { return UWZ.forces.filter(function (f) { return f.army === a; }); }
  function currentForce() {
    return UWZ.forces.filter(function (f) { return f.army === state.army && f.force === state.force; })[0] || null;
  }
  function advisorRefs(force) {   // "cartel:csf" -> {army, list}
    return (force && force.advisor_lists || []).map(function (r) {
      var p = r.split(":"); return { army: p[0], list: p[1] };
    });
  }
  function neededArmies() {
    var f = currentForce(), out = [state.army];
    advisorRefs(f).forEach(function (r) { if (out.indexOf(r.army) < 0) out.push(r.army); });
    state.units.forEach(function (u) { if (out.indexOf(u.army) < 0) out.push(u.army); });
    return out;
  }
  function entryOf(u) {
    var d = UWZ.armies[u.army];
    return d && d.entries.filter(function (e) { return e.id === u.entry; })[0];
  }

  // ---- helpers ------------------------------------------------------------------------------------------------
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c != null) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  // a choice with its rules text in a hover popup (CSS: .tip[data-tip]:hover::after)
  function tipLabel(tip, kids) {
    var l = el("label", tip ? { class: "tip", "data-tip": tip } : {}, kids);
    return l;
  }
  function num(v, d) { var n = parseInt(v, 10); return isNaN(n) ? d : n; }
  function listLabel(army, list) {
    var d = UWZ.armies[army];
    return (d && d.lists[list]) || list;
  }

  // ---- the list -----------------------------------------------------------------------------------------------
  function newUnit(army, entry, advisor) {
    var u = { uid: nextUid++, army: army, entry: entry.id, advisor: !!advisor, counts: {}, loadouts: [], corp: [],
              powers: {}, enh: {} };
    entry.models.forEach(function (m) {
      var c = m.count || {};
      u.counts[m.slug] = (c.min || 0) > 0 ? c.min : 0;
    });
    if (entry.models.every(function (m) { return !u.counts[m.slug]; })) u.counts[entry.models[0].slug] = 1;
    return u;
  }
  function modelCount(u, m) { return num(u.counts[m.slug], 0); }
  function unitSize(u) {
    var e = entryOf(u); if (!e) return 0;
    return e.models.reduce(function (s, m) { return s + modelCount(u, m); }, 0);
  }
  function viable(u, weapon) {    // models of the unit that carry the weapon (null: every model)
    var e = entryOf(u); if (!e) return 0;
    return e.models.reduce(function (s, m) {
      return s + (weapon === null || m.weapons.indexOf(weapon) >= 0 ? modelCount(u, m) : 0);
    }, 0);
  }
  function loadoutItem(army, group, name) {
    var d = UWZ.armies[army];
    return ((d.loadouts[group]) || []).filter(function (x) { return x.name === name; })[0];
  }
  function loadoutN(u, lo) {
    var v = viable(u, lo.weapon);
    return LOADOUT_PER_MODEL && lo.n != null ? Math.min(num(lo.n, v), v) : v;
  }
  function powerItem(army, group, id) {
    var d = UWZ.armies[army];
    return ((d.powers[group]) || []).filter(function (x) { return x.id === id; })[0];
  }
  // the enhancements a model carries: the squad's choice (Cybertronic squads) or its own
  function enhOf(u, e, m) {
    if (e && e.enh_per_squad) return m.enhancements ? (u.enh["*"] || []) : [];
    return u.enh[m.slug] || [];
  }
  function enhItem(army, id) {
    return UWZ.armies[army].enhancements.filter(function (x) { return x.id === id; })[0];
  }

  function unitPoints(u) {
    var e = entryOf(u); if (!e) return { total: 0, lines: [] };
    var lines = [], total = 0;
    function add(label, pts) { lines.push([label, pts]); total += pts; }
    if (e.team_pc) {
      if (unitSize(u) > 0) add("Team", e.team_pc);
    } else {
      e.models.forEach(function (m) { var n = modelCount(u, m); if (n) add(n + " × " + m.name, n * m.pc); });
    }
    u.corp.forEach(function (name) {
      var it = loadoutItem(u.army, e.corp_loadout, name);
      if (it) { var n = viable(u, null); add(name + " (" + n + " × " + it.cost + ")", n * it.cost); }
    });
    u.loadouts.forEach(function (lo) {
      var it = loadoutItem(u.army, lo.group, lo.item);
      if (it) { var n = loadoutN(u, lo); add(lo.item + " on " + lo.weapon + " (" + n + " × " + it.cost + ")", n * it.cost); }
    });
    e.models.forEach(function (m) {
      var n = modelCount(u, m); if (!n) return;
      (u.powers[m.slug] || []).forEach(function (id) {
        var g = (m.powers || []).map(function (p) { return p.from; });
        for (var i = 0; i < g.length; i++) {
          var it = powerItem(u.army, g[i], id);
          if (it) { add(it.name + " (" + m.name + (n > 1 ? ", " + n + " × " + it.cost : "") + ")", n * it.cost); break; }
        }
      });
      enhOf(u, e, m).forEach(function (id) {
        var it = enhItem(u.army, id);
        if (it) add(it.name + " (" + m.name + (n > 1 ? ", " + n + " × " + it.cost : "") + ")", n * it.cost);
      });
    });
    return { total: total, lines: lines };
  }
  function designation(u, force) {
    var e = entryOf(u);
    if (!e) return "?";
    if (u.advisor) return "support";            // advisors, individuals included, are a support unit role (book p.37)
    if (e.kind === "individual") return "individual";
    var l = force && force.lists[e.list];
    return (l && l.as) || e.designation;
  }

  // ---- rule checks (warnings only) -----------------------------------------------------------------------
  function checks() {
    var force = currentForce(), w = [], notes = [];
    var squads = { grunt: [], elite: [], support: [] }, indiv = [];
    var modelTotals = {};
    state.units.forEach(function (u) {
      var e = entryOf(u); if (!e) return;
      var d = designation(u, force);
      if (d === "individual") indiv.push(u); else (squads[d] || (squads[d] = [])).push(u);
      e.models.forEach(function (m) {
        var k = u.army + "|" + m.name;
        modelTotals[k] = (modelTotals[k] || 0) + modelCount(u, m);
      });
      if (force && !u.advisor && !force.lists[e.list])
        w.push(e.name + ": the " + listLabel(u.army, e.list) + " list is not part of a " + force.force + " force.");
    });
    var G = squads.grunt.length, E = squads.elite.length, S = squads.support.length;
    if (S > Math.floor(G / 2))
      w.push("Support units: " + S + ", but only one is allowed per two grunt squads (" + G + " grunt squads; book p.37).");
    // each elite squad needs a grunt squad of equal or greater size (book p.36)
    var grunts = squads.grunt.map(unitSize).sort(function (a, b) { return b - a; });
    squads.elite.map(function (u) { return [unitSize(u), u]; }).sort(function (a, b) { return b[0] - a[0]; })
      .forEach(function (x) {
        var i = grunts.findIndex(function (g) { return g >= x[0]; });
        if (i < 0) w.push(entryOf(x[1]).name + " (elite, " + x[0] + " models) has no grunt squad of equal or greater size to match it (book p.36).");
        else grunts.splice(i, 1);
      });
    if (indiv.length > G + E)
      w.push("Individuals: " + indiv.length + ", but only one is allowed per squad (" + (G + E) + " grunt and elite squads; book p.36).");
    // force commanders (book p.36; FAQ "Page 36: Force Commanders")
    var fcs = indiv.filter(function (u) { return entryOf(u).role === "force-commander"; });
    if (fcs.length > 1) w.push("Force commanders: " + fcs.length + ", but an army may have only one (book p.36).");
    if (fcs.length) {
      var officers = indiv.length - 1, others = G + E + S;
      if (officers < 3 || others < 6)
        notes.push(entryOf(fcs[0]).name + " acts as a division commander: a force commander needs three other officers "
          + "and six other squads (this list: " + officers + " and " + others + "). FAQ \"Page 36: Force Commanders\".");
    }
    // the exclusive list groups (e.g. a Dark Apostle force takes the Cult list or the Horde list, not both)
    (force && force.exclusive || []).forEach(function (grp) {
      var used = grp.filter(function (l) {
        return state.units.some(function (u) { var e = entryOf(u); return !u.advisor && e && e.list === l; });
      });
      if (used.length > 1) w.push("This force may use only one of these lists: " + used.map(function (l) { return listLabel(state.army, l); }).join(", ") + ".");
    });
    // model counts and limits
    state.units.forEach(function (u) {
      var e = entryOf(u); if (!e) return;
      var required = 0, specialists = 0;
      e.models.forEach(function (m) {
        var n = modelCount(u, m), c = m.count || {}, per = m.per;
        if (per === "squad" || per === e.name || per === e.name + " squad") {
          if (n > 0 && c.min && n < c.min) w.push(e.name + ": " + n + " × " + m.name + ", at least " + c.min + " required.");
          if (c.min && n === 0 && m.role !== "specialist") w.push(e.name + ": " + m.name + " is required (" + c.min + ").");
          if (c.max != null && n > c.max) w.push(e.name + ": " + n + " × " + m.name + ", at most " + c.max + " per squad.");
        } else if (per === "army") {
          var t = modelTotals[u.army + "|" + m.name];
          if (c.max != null && t > c.max) w.push(m.name + ": " + t + " in the army, at most " + c.max + " per army.");
        } else if (per === "model") {
          // "per model": checked against the model it belongs to; nothing to count here
        } else {
          // linked to another unit: "per <unit>" or "per <unit> squad"
          var target = per.replace(/ squad$/, "");
          var host = state.units.filter(function (v) { var f = entryOf(v); return f && f.name === target; }).length;
          var known = Object.keys(UWZ.armies).some(function (a) {
            return UWZ.armies[a].entries.some(function (x) { return x.name === target; });
          });
          if (known && n > 0) {
            if (!host) w.push(e.name + ": " + m.name + " needs a " + target + " squad in the army.");
            else if (c.max != null && modelTotals[u.army + "|" + m.name] > c.max * host)
              w.push(m.name + ": at most " + c.max + " per " + target + " squad (" + host + " in the army).");
          }
        }
        if ((c.min || 0) > 0 && m.role !== "specialist") required += n;
        if (m.role === "specialist" && (per === "squad" || per === e.name)) specialists += n;
        var pw = u.powers[m.slug] || [], mx = (m.powers || []).reduce(function (s, p) { return s + p.max; }, 0);
        if (n && pw.length > mx) w.push(e.name + ": " + m.name + " has " + pw.length + " powers, at most " + mx + ".");
        var en = e.enh_per_squad ? [] : enhOf(u, e, m);     // a squad's shared choice is checked once, below
        if (n && en.length > (m.enhancements || 0)) w.push(e.name + ": " + m.name + " has " + en.length + " enhancements, at most " + (m.enhancements || 0) + ".");
      });
      // specialist ratio (FAQ "Page 36: Specialist Buying Criteria"): one per four required models in grunt squads,
      // one per three in elite squads; a required leader counts
      var d = designation(u, force);
      if (e.kind === "squad" && (d === "grunt" || d === "elite") && specialists) {
        var per = d === "elite" ? 3 : 4, allowed = Math.floor(required / per);
        if (specialists > allowed)
          w.push(e.name + ": " + specialists + " specialists, but " + required + " required models allow " + allowed
            + " (one per " + per + " in " + d + " squads; FAQ \"Page 36\").");
      }
      if (e.enh_per_squad) {
        var smax = e.models.reduce(function (s, m) { return Math.max(s, m.enhancements || 0); }, 0);
        var sn = (u.enh["*"] || []).length;
        if (sn > smax) w.push(e.name + ": " + sn + " enhancements for the squad, at most " + smax + ".");
      }
      if (unitSize(u) === 0) w.push(e.name + ": no models chosen.");
    });
    var total = state.units.reduce(function (s, u) { return s + unitPoints(u).total; }, 0);
    if (state.limit && total > state.limit) w.push("Points: " + total + ", over the limit of " + state.limit + ".");
    if (force && force.advisor_no_named) {
      // Saglielli: "May take Brotherhood Dedicated (no named personalities)" - a named personality is a Brotherhood
      // individual limited to one per army
      state.units.forEach(function (u) {
        var e = entryOf(u);
        if (u.advisor && u.army === "brotherhood" && e && e.kind === "individual"
            && e.models.some(function (m) { return m.per === "army"; }))
          w.push(e.name + ": a named personality, but this force's advisors may not be (“" + force.advisors + "”).");
      });
    }
    return { warnings: w, notes: notes, total: total };
  }

  // ---- editor -------------------------------------------------------------------------------------------------
  function fillArmySelect() {
    var s = $("army"); s.innerHTML = "";
    UWZ.builderArmies.forEach(function (a) { s.appendChild(el("option", { value: a, text: UWZ.titles[a] || a })); });
    s.value = state.army;
  }
  function fillForceSelect() {
    var s = $("force"); s.innerHTML = "";
    forcesOf(state.army).forEach(function (f) { s.appendChild(el("option", { value: f.force, text: f.force })); });
    s.value = state.force;
    var f = currentForce();
    var pool = advisorRefs(f).map(function (r) { return (UWZ.titles[r.army] || r.army) + ": " + listLabel(r.army, r.list); });
    $("force-info").textContent = f ? ("Lists: " + Object.keys(f.lists).map(function (l) { return listLabel(state.army, l); }).join(", ")
      + ". Advisors: " + (pool.length ? pool.join(", ") : "none") + "."
      + (f.advisors ? " Printed restriction: “" + f.advisors + "”" : "")) : "";
  }
  function fillAddSelect() {
    var s = $("add-entry"), f = currentForce(); s.innerHTML = "";
    if (!f) return;
    var d = UWZ.armies[state.army];
    Object.keys(f.lists).forEach(function (l) {
      var g = el("optgroup", { label: listLabel(state.army, l) + (f.lists[l].as ? " (count as " + f.lists[l].as + ")" : "") });
      d.entries.filter(function (e) { return e.list === l; }).forEach(function (e) {
        g.appendChild(el("option", { value: state.army + "|" + e.id + "|0", text: e.name }));
      });
      s.appendChild(g);
    });
    advisorRefs(f).forEach(function (r) {
      var ad = UWZ.armies[r.army]; if (!ad) return;
      var g = el("optgroup", { label: "Advisors: " + (UWZ.titles[r.army] || r.army) + " - " + listLabel(r.army, r.list) });
      ad.entries.filter(function (e) { return e.list === r.list; }).forEach(function (e) {
        g.appendChild(el("option", { value: r.army + "|" + e.id + "|1", text: e.name }));
      });
      s.appendChild(g);
    });
  }

  function unitEditor(u) {
    var e = entryOf(u);
    if (!e) return el("div", { class: "unit" }, [el("p", { class: "warn", text: "Unknown unit " + u.entry + " (" + u.army + ")." })]);
    var pts = unitPoints(u).total;
    var rows = e.models.map(function (m) {
      var c = m.count || {};
      var inp = el("input", { type: "number", min: "0", value: String(modelCount(u, m)),
        oninput: function () { u.counts[m.slug] = num(this.value, 0); changed(false); } });
      var rng = (c.min === c.max ? c.min : c.min + "-" + c.max) + " per " + m.per;
      return el("tr", {}, [el("td", { class: "num" }, [inp]),
        el("td", {}, [el("b", { text: m.name }), " ", el("span", { class: "muted small", text: (m.role || "").replace(/-/g, " ") + " · " + rng + (e.team_pc ? "" : " · " + m.pc + " pts") })])]);
    });
    var opts = el("div", { class: "opt" });
    // corp load-outs
    if (e.corp_loadout) {
      var items = UWZ.armies[u.army].loadouts[e.corp_loadout] || [];
      opts.appendChild(el("h4", { text: e.corp_loadout }));
      var line = el("div", { class: "line" });
      items.forEach(function (it) {
        var cb = el("input", { type: "checkbox", onchange: function () {
          if (this.checked) { if (u.corp.indexOf(it.name) < 0) u.corp.push(it.name); }
          else u.corp = u.corp.filter(function (x) { return x !== it.name; });
          changed(true);
        } });
        cb.checked = u.corp.indexOf(it.name) >= 0;
        line.appendChild(tipLabel(it.tip, [cb, it.name + " (" + it.cost + " pts per model)"]));
      });
      opts.appendChild(line);
    }
    // weapon load-outs: one item per group and weapon
    e.weapon_loadouts.forEach(function (wl) {
      if (!wl.groups.length) return;
      opts.appendChild(el("h4", { text: "Load-outs: " + wl.weapon }));
      wl.groups.forEach(function (g) {
        var cur = u.loadouts.filter(function (x) { return x.weapon === wl.weapon && x.group === g; })[0];
        var items = UWZ.armies[u.army].loadouts[g] || [];
        if (!items.length) return;
        // radio buttons, not a dropdown, so every choice can show its rules on hover
        var radioName = "lo-" + u.uid + "-" + slugOf(wl.weapon) + "-" + slugOf(g);
        var pick = function (value) {
          u.loadouts = u.loadouts.filter(function (x) { return !(x.weapon === wl.weapon && x.group === g); });
          if (value) u.loadouts.push({ weapon: wl.weapon, group: g, item: value, n: null });
          changed(true);
        };
        var kids = [el("span", { class: "muted small", text: g + ": " })];
        [{ name: "", cost: null, tip: "" }].concat(items).forEach(function (it) {
          var rb = el("input", { type: "radio", name: radioName, onchange: function () { pick(it.name); } });
          rb.checked = cur ? cur.item === it.name : !it.name;
          kids.push(tipLabel(it.tip, [rb, it.name ? it.name + " (" + it.cost + " pts)" : "none"]));
        });
        if (cur && LOADOUT_PER_MODEL) {
          var v = viable(u, wl.weapon);
          kids.push(" on ", el("input", { type: "number", min: "0", max: String(v), value: String(loadoutN(u, cur)),
            oninput: function () { cur.n = num(this.value, v); changed(false); } }), el("span", { class: "muted small", text: " of " + v + " models" }));
        }
        opts.appendChild(el("div", { class: "line" }, kids));
      });
    });
    // Cybertronic enhancements and Dark Legion necrobionics: "When a model in a squad takes an enhancement, all members of the same squad must take the same
    // enhancement" (book p.351): one choice for the squad, on every model that may take enhancements
    var squadMax = e.enh_per_squad ? e.models.reduce(function (s, m) { return Math.max(s, m.enhancements || 0); }, 0) : 0;
    if (squadMax) {
      var sq = u.enh["*"] || (u.enh["*"] = []);
      opts.appendChild(el("h4", { text: "Enhancements: whole squad (up to " + squadMax + ")" }));
      var sline = el("div", { class: "line" });
      UWZ.armies[u.army].enhancements.forEach(function (it) {
        var cb = el("input", { type: "checkbox", onchange: function () {
          if (this.checked) sq.push(it.id); else u.enh["*"] = sq = sq.filter(function (x) { return x !== it.id; });
          changed(true);
        } });
        cb.checked = sq.indexOf(it.id) >= 0;
        sline.appendChild(tipLabel(it.tip, [cb, it.name + " (" + it.cost + " pts per model)"]));
      });
      opts.appendChild(sline);
    }
    // powers and enhancements, per model type
    e.models.forEach(function (m) {
      if (m.powers && m.powers.length) {
        var chosen = u.powers[m.slug] || (u.powers[m.slug] = []);
        var mx = m.powers.reduce(function (s, p) { return s + p.max; }, 0);
        opts.appendChild(el("h4", { text: "Powers: " + m.name + " (up to " + mx + ")" }));
        m.powers.forEach(function (p) {
          var line = el("div", { class: "line" }, [el("span", { class: "muted small", text: p.from + ": " })]);
          (UWZ.armies[u.army].powers[p.from] || []).forEach(function (it) {
            var cb = el("input", { type: "checkbox", onchange: function () {
              if (this.checked) chosen.push(it.id); else u.powers[m.slug] = chosen = chosen.filter(function (x) { return x !== it.id; });
              changed(true);
            } });
            cb.checked = chosen.indexOf(it.id) >= 0;
            line.appendChild(tipLabel(it.tip, [cb, it.name + " (" + it.cost + " pts)"]));
          });
          opts.appendChild(line);
        });
      }
      if (m.enhancements && !e.enh_per_squad) {
        var ch = u.enh[m.slug] || (u.enh[m.slug] = []);
        opts.appendChild(el("h4", { text: "Enhancements: " + m.name + " (up to " + m.enhancements + ")" }));
        var line = el("div", { class: "line" });
        UWZ.armies[u.army].enhancements.forEach(function (it) {
          var cb = el("input", { type: "checkbox", onchange: function () {
            if (this.checked) ch.push(it.id); else u.enh[m.slug] = ch = ch.filter(function (x) { return x !== it.id; });
            changed(true);
          } });
          cb.checked = ch.indexOf(it.id) >= 0;
          line.appendChild(tipLabel(it.tip, [cb, it.name + " (" + it.cost + " pts)"]));
        });
        opts.appendChild(line);
      }
    });
    var tag = (u.advisor ? "advisor · " : "") + designation(u, currentForce());
    return el("div", { class: "unit" }, [
      el("header", {}, [el("h3", { text: e.name }),
        el("span", { class: "muted small", text: tag + " · " + (UWZ.titles[u.army] || u.army) + " · " + listLabel(u.army, e.list) }),
        el("span", { class: "pts", "data-pts": String(u.uid), text: pts + " pts" }),
        el("button", { type: "button", class: "remove", text: "Remove", onclick: function () {
          state.units = state.units.filter(function (x) { return x !== u; }); changed(true);
        } })]),
      el("table", {}, [el("tbody", {}, rows)]), opts]);
  }

  // ---- output -------------------------------------------------------------------------------------------------
  function slugOf(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function outCard(u) {
    var e = entryOf(u);
    var box = el("div", { html: e.card });
    var card = box.firstElementChild;
    card.removeAttribute("id");
    var keep = {}, weapons = {};
    e.models.forEach(function (m) {
      var n = modelCount(u, m);
      if (n) { keep[m.slug] = n; m.weapons.forEach(function (w) { weapons[slugOf(w)] = 1; }); }
    });
    card.querySelectorAll("[data-m]").forEach(function (n) {
      var k = n.getAttribute("data-m");
      if (!keep[k]) { n.remove(); return; }
      var cl = n.querySelector(".cl");
      if (cl) cl.textContent = "× " + keep[k];
    });
    card.querySelectorAll("[data-w]").forEach(function (n) { if (!weapons[n.getAttribute("data-w")]) n.remove(); });
    card.querySelectorAll(".lo-avail, .opt-info").forEach(function (n) { n.remove(); });
    card.querySelectorAll("table.diff tbody tr").forEach(function (r) {
      var td = r.querySelector("td"); if (td && !td.textContent.trim()) r.remove();
    });
    card.querySelectorAll("tr.sub").forEach(function (r) { if (!r.textContent.trim()) r.remove(); });
    var diff = card.querySelector("table.diff tbody");
    if (diff && !diff.children.length) diff.closest(".scroll").remove();
    var p = unitPoints(u);
    var head = card.querySelector("header .meta");
    if (head) head.appendChild(el("b", { text: " · " + p.total + " pts" + (u.advisor ? " · advisor" : "") }));
    var dl = el("dl", { class: "chosen" });
    var chosen = [];
    function withGives(name, it) { return it && it.gives ? name + " (gives " + it.gives + ")" : name; }
    u.corp.forEach(function (x) { chosen.push(withGives(x, loadoutItem(u.army, e.corp_loadout, x))); });
    u.loadouts.forEach(function (lo) {
      var it = loadoutItem(u.army, lo.group, lo.item);
      chosen.push(lo.item + " (" + lo.weapon + ", " + loadoutN(u, lo) + " models" + (it && it.gives ? "; gives " + it.gives : "") + ")");
    });
    if (chosen.length) { dl.appendChild(el("dt", { text: "Load-outs" })); dl.appendChild(el("dd", { text: chosen.join("; ") })); }
    if (e.enh_per_squad && (u.enh["*"] || []).length) {
      var se = u.enh["*"].map(function (id) { var it = enhItem(u.army, id); return it ? withGives(it.name, it) : id; });
      dl.appendChild(el("dt", { text: "Enhancements (whole squad)" })); dl.appendChild(el("dd", { text: se.join(", ") }));
    }
    e.models.forEach(function (m) {
      if (!modelCount(u, m)) return;
      var names = [];
      (u.powers[m.slug] || []).forEach(function (id) {
        (m.powers || []).forEach(function (pp) { var it = powerItem(u.army, pp.from, id); if (it) names.push(withGives(it.name, it)); });
      });
      if (names.length) { dl.appendChild(el("dt", { text: "Powers: " + m.name })); dl.appendChild(el("dd", { text: names.join(", ") })); }
      var en = (e.enh_per_squad ? [] : u.enh[m.slug] || []).map(function (id) { var it = enhItem(u.army, id); return it ? withGives(it.name, it) : id; });
      if (en.length) { dl.appendChild(el("dt", { text: "Enhancements: " + m.name })); dl.appendChild(el("dd", { text: en.join(", ") })); }
    });
    if (dl.children.length) card.querySelector("header").after(dl);
    return card;
  }

  function collectRules() {
    var ids = [], html = {};
    function addFrom(army, id) {
      var d = UWZ.armies[army];
      if (!d || !d.appendix[id] || html[id]) return;
      html[id] = d.appendix[id]; ids.push(id);
    }
    function addAll(army, list) { (list || []).forEach(function (id) { addFrom(army, id); }); }
    var flags = { all: true };
    state.units.forEach(function (u) {
      var e = entryOf(u); if (!e) return;
      e.models.forEach(function (m) {
        if (!modelCount(u, m)) return;
        m.refs.forEach(function (r) { addFrom(u.army, r); });
        if (m.vehicle) flags.vehicle = true;
        if (m.mount) flags.mount = true;
        if (m.vehicle_type) flags[m.vehicle_type] = true;   // e.g. the Walker reminder
        if (m.summoned) flags.summoned = true;
        (u.powers[m.slug] || []).forEach(function (id) {
          addFrom(u.army, id);
          (m.powers || []).forEach(function (pp) { var it = powerItem(u.army, pp.from, id); if (it) addAll(u.army, it.grants); });
        });
        enhOf(u, e, m).forEach(function (id) { addFrom(u.army, id); addAll(u.army, (enhItem(u.army, id) || {}).grants); flags.enhancements = true; });
        if (m.refs.some(function (r) { return r.indexOf("enhancements-") === 0; })) flags.enhancements = true;
      });
      u.corp.forEach(function (x) { var it = loadoutItem(u.army, e.corp_loadout, x); if (it) { addFrom(u.army, it.id); addAll(u.army, it.grants); } });
      u.loadouts.forEach(function (lo) { var it = loadoutItem(u.army, lo.group, lo.item); if (it) { addFrom(u.army, it.id); addAll(u.army, it.grants); } });
    });
    var d = UWZ.armies[state.army];
    if (d) d.reminders.forEach(function (r) { if (flags[r.applies_to]) addFrom(state.army, r.id); });
    var parts = [["ab-", "Special abilities"], ["pw-", "Powers"], ["enhancements-", "Cybernetic Enhancements"],
                 ["necrobionics-", "Necrobionic Enhancements"], ["li-", "Load-outs"], ["eq-", "Equipment"],
                 ["rm-", "Rule reminders"]];
    var box = el("div");
    parts.forEach(function (p) {
      var mine = ids.filter(function (i) { return i.indexOf(p[0]) === 0; }).sort();
      if (!mine.length) return;
      box.appendChild(el("h2", { class: "part", text: p[1] }));
      if (p[0] === "li-" && d) box.appendChild(el("p", { class: "muted", text: d.loadout_rule + " (book p.141)" }));
      mine.forEach(function (i) { box.appendChild(el("div", { html: html[i] }).firstElementChild); });
    });
    return box;
  }

  function render() {
    var force = currentForce(), res = checks();
    // editor
    var ed = $("editor"); ed.innerHTML = "";
    if (!state.units.length) ed.appendChild(el("p", { class: "empty", text: "No units yet: pick one above and press Add." }));
    state.units.forEach(function (u) { ed.appendChild(unitEditor(u)); });
    renderOutput(res, force);
  }
  function renderOutput(res, force) {
    res = res || checks(); force = force || currentForce();
    $("out-title").textContent = state.name || ((UWZ.titles[state.army] || "") + " army list");
    var over = state.limit && res.total > state.limit;
    $("out-sub").innerHTML = "";
    $("out-sub").appendChild(el("span", { text: (UWZ.titles[state.army] || "") + " · " + (force ? force.force : "") + " · " }));
    $("out-sub").appendChild(el("b", { class: over ? "over" : "", text: res.total + " pts" + (state.limit ? " of " + state.limit : "") }));
    // summary table
    var tb = el("tbody");
    state.units.forEach(function (u) {
      var e = entryOf(u); if (!e) return;
      var who = e.models.filter(function (m) { return modelCount(u, m); }).map(function (m) { return modelCount(u, m) + " × " + m.name; }).join(", ");
      tb.appendChild(el("tr", {}, [el("th", { text: e.name }), el("td", { text: designation(u, force) + (u.advisor ? " (advisor)" : "") }),
        el("td", { text: who }), el("td", { class: "num", text: String(unitPoints(u).total) })]));
    });
    tb.appendChild(el("tr", {}, [el("th", { text: "Total" }), el("td"), el("td"), el("td", { class: "num" + (over ? " over" : ""), text: String(res.total) })]));
    $("out-summary").innerHTML = "";
    if (state.units.length)
      $("out-summary").appendChild(el("div", { class: "scroll" }, [el("table", {}, [el("thead", {}, [el("tr", {}, [
        el("th", { text: "Unit" }), el("th", { text: "Type" }), el("th", { text: "Models" }), el("th", { class: "num", text: "Points" })])]), tb])]));
    var cards = $("out-cards"); cards.innerHTML = "";
    state.units.forEach(function (u) { if (entryOf(u)) cards.appendChild(outCard(u)); });
    var rules = $("out-rules"); rules.innerHTML = "";
    if (state.units.length) rules.appendChild(collectRules());
    // warnings at the bottom
    var wb = $("warnings"); wb.innerHTML = "";
    if (res.notes.length) wb.appendChild(el("div", { class: "notes" }, [el("h2", { text: "Notes" }),
      el("ul", {}, res.notes.map(function (t) { return el("li", { text: t }); }))]));
    if (res.warnings.length) wb.appendChild(el("div", { class: "warnings" }, [el("h2", { text: "Warnings (" + res.warnings.length + ")" }),
      el("ul", {}, res.warnings.map(function (t) { return el("li", { text: t }); }))]));
    // live points in the editor
    state.units.forEach(function (u) {
      var n = document.querySelector('[data-pts="' + u.uid + '"]');
      if (n) n.textContent = unitPoints(u).total + " pts";
    });
    save();
  }
  // full: rebuild the editor too (structure changed); otherwise only the output, so inputs keep focus
  function changed(full) { if (full) render(); else renderOutput(); }

  // ---- saving and sharing -------------------------------------------------------------------------------
  function serial() {
    return { v: 1, army: state.army, force: state.force, limit: state.limit, name: state.name,
      units: state.units.map(function (u) {
        return { a: u.army, e: u.entry, ad: u.advisor ? 1 : 0, c: u.counts, l: u.loadouts, k: u.corp, p: u.powers, h: u.enh };
      }) };
  }
  function restore(o) {
    if (!o || UWZ.builderArmies.indexOf(o.army) < 0) return false;
    state.army = o.army; state.force = o.force || ""; state.limit = o.limit || null; state.name = o.name || "";
    state.units = (o.units || []).map(function (x) {
      return { uid: nextUid++, army: x.a, entry: x.e, advisor: !!x.ad, counts: x.c || {}, loadouts: x.l || [],
               corp: x.k || [], powers: x.p || {}, enh: x.h || {} };
    });
    return true;
  }
  function save() { try { localStorage.setItem(STORE, JSON.stringify(serial())); } catch (err) { /* storage unavailable */ } }
  function b64(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function unb64(s) { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return decodeURIComponent(escape(atob(s))); }
  function shareLink() { return location.href.split("#")[0] + "#l=" + b64(JSON.stringify(serial())); }

  // ---- start --------------------------------------------------------------------------------------------------
  function setArmy(a, keepForce) {
    state.army = a;
    var fs = forcesOf(a);
    if (!keepForce || !fs.some(function (f) { return f.force === state.force; })) state.force = fs.length ? fs[0].force : "";
  }
  function refresh() {
    return Promise.all(neededArmies().map(loadArmy)).then(function () {
      fillArmySelect(); fillForceSelect(); fillAddSelect();
      $("limit").value = state.limit || ""; $("name").value = state.name;
      render();
    }).catch(function (err) { $("msg").textContent = err.message; });
  }
  function start() {
    var restored = false;
    var m = location.hash.match(/^#l=(.+)$/);
    if (m) { try { restored = restore(JSON.parse(unb64(m[1]))); } catch (err) { restored = false; } }
    if (!restored) { try { restored = restore(JSON.parse(localStorage.getItem(STORE) || "null")); } catch (err) { restored = false; } }
    if (!restored) setArmy(UWZ.builderArmies[0], false);
    else setArmy(state.army, true);
    $("army").addEventListener("change", function () {
      if (UWZ.builderArmies.indexOf(this.value) < 0) { this.value = state.army; return; }
      if (state.units.length && !confirm("Changing army clears the list. Continue?")) { this.value = state.army; return; }
      state.units = []; setArmy(this.value, false); refresh();
    });
    $("force").addEventListener("change", function () { state.force = this.value; refresh(); });
    $("limit").addEventListener("input", function () { state.limit = num(this.value, null) || null; renderOutput(); });
    $("name").addEventListener("input", function () { state.name = this.value; renderOutput(); });
    $("add").addEventListener("click", function () {
      var v = $("add-entry").value; if (!v) return;
      var p = v.split("|"), d = UWZ.armies[p[0]];
      var e = d && d.entries.filter(function (x) { return x.id === p[1]; })[0];
      if (e) { state.units.push(newUnit(p[0], e, p[2] === "1")); render(); }
    });
    $("share").addEventListener("click", function () {
      var link = shareLink();
      history.replaceState(null, "", link);
      var done = function () { $("msg").textContent = "Share link copied."; };
      var manual = function () { $("msg").textContent = "Copy the share link from the address bar."; };
      if (navigator.clipboard) navigator.clipboard.writeText(link).then(done, manual);
      else manual();
    });
    $("print").addEventListener("click", function () { window.print(); });
    $("clear").addEventListener("click", function () {
      if (confirm("Remove every unit from the list?")) { state.units = []; render(); }
    });
    refresh();
  }
  start();
})();
