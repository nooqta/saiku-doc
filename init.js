const fs = require('fs');
const path = require('path');
const documentationStructure = [
    { name: 'home', type: 'file' },
    { 
        name: 'about-saiku', 
        type: 'folder',
        children: [
            { name: 'overview', type: 'file' },
            { name: 'why-saiku', type: 'file' },
            { name: 'peas-framework', type: 'file' }
        ]
    },
    {
        name: 'getting-started',
        type: 'folder',
        children: [
            { name: 'installation', type: 'file' },
            { name: 'configuration', type: 'file' },
            { name: 'quickstart-guide', type: 'file' },
            { name: 'environment-variables', type: 'file' }
        ]
    },
    {
        name: 'user-guide',
        type: 'folder',
        children: [
            { name: 'usage-instructions', type: 'file' },
            { name: 'use-cases', type: 'file' }
        ]
    },
    {
        name: 'api-reference',
        type: 'folder',
        children: [
            { name: 'introduction', type: 'file' }
        ]
    },
    {
        name: 'developer-guide',
        type: 'folder',
        children: [
            { name: 'development-setup', type: 'file' },
            { name: 'contribution-guidelines', type: 'file' },
            { name: 'building-and-testing', type: 'file' },
            { name: 'codebase-architecture', type: 'file' }
        ]
    },
    {
        name: 'integration-guides',
        type: 'folder',
        children: [
            { name: 'google-services', type: 'file' },
            { name: 'external-apis', type: 'file' }
        ]
    },
    {
        name: 'advanced-topics',
        type: 'folder',
        children: [
            { name: 'modular-design', type: 'file' },
            { name: 'customization', type: 'file' },
            { name: 'future-roadmap', type: 'file' }
        ]
    },
    {
        name: 'faqs-and-troubleshooting',
        type: 'folder',
        children: [
            { name: 'faqs', type: 'file' },
            { name: 'troubleshooting', type: 'file' }
        ]
    },
    {
        name: 'community-and-support',
        type: 'folder',
        children: [
            { name: 'contributing', type: 'file' },
            { name: 'forums-and-channels', type: 'file' },
            { name: 'feedback-and-issues', type: 'file' }
        ]
    },
    {
        name: 'api-rate-limits-and-costs',
        type: 'folder',
        children: [
            { name: 'api-usage', type: 'file' }
        ]
    },
    {
        name: 'license-and-legal',
        type: 'folder',
        children: [
            { name: 'licensing', type: 'file' }
        ]
    }
];

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function createDocumentation(structure, basePath = '.') {
    structure.forEach(item => {
        const itemPath = path.join(basePath, item.name);
        
        if (item.type === 'file') {
            const content = `---\ntitle: '${toTitleCase(item.name.replace(/-/g, ' '))}'\ndescription: ''\n---\n`;
            fs.writeFileSync(`${itemPath}.mdx`, content);
        } else if (item.type === 'folder') {
            if (!fs.existsSync(itemPath)) {
                fs.mkdirSync(itemPath);
            }
            if (item.children) {
                createDocumentation(item.children, itemPath);
            }
        }
    });
}

createDocumentation(documentationStructure);
