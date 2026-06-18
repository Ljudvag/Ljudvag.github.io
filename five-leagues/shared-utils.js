// Shared utility functions for Five Leagues Campaign pages

// Helper function to render items with tooltips if they exist
function renderItem(item) {
    // Check if item starts with a number (quantity)
    const quantityMatch = item.match(/^(\d+\s+)(.+)$/);
    let quantity = '';
    let itemText = item;
    
    if (quantityMatch) {
        quantity = quantityMatch[1];
        itemText = quantityMatch[2];
    }
    
    // Check if item has modifier in parentheses like (Fine), (Damaged)
    const modifierMatch = itemText.match(/^(.+?)\s*(\([^)]+\))$/);
    if (modifierMatch) {
        const baseName = modifierMatch[1];
        const modifier = modifierMatch[2];
        const modifierName = modifier.slice(1, -1); // Remove parentheses
        
        const baseTooltip = tooltips[baseName] ? tt(baseName) : baseName;
        const modifierTooltip = tooltips[modifierName] ? '(' + tt(modifierName) + ')' : modifier;
        
        return quantity + baseTooltip + ' ' + modifierTooltip;
    }
    
    return quantity + (tooltips[itemText] ? tt(itemText) : itemText);
}

// Helper function to load campaign data script
function loadCampaignScript(campaignId, onSuccess, onError) {
    const script = document.createElement('script');
    script.src = `c${campaignId}/warband-data.js`;
    script.onload = onSuccess;
    script.onerror = onError || (() => console.error('Error loading campaign data'));
    document.head.appendChild(script);
}
