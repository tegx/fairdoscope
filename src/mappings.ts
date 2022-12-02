export enum Renderer {
    Hdl,
    Text,
    Url,
    Object
}

export interface DataTypeEntry {
    name: string;
    class: string;
    renderer: Renderer
};

export const dataTypes = new Map<string, DataTypeEntry>();
//HelmholtzKIP
dataTypes.set("21.T11148/076759916209e5d62bd5", {'name': 'kernelInformationProfile', 'class':'fa-solid fa-table-list', 'renderer': Renderer.Hdl});
dataTypes.set("21.T11148/397d831aa3a9d18eb52c", {'name': 'dateModified', 'class':'fa-solid fa-file-pen', 'renderer': Renderer.Text});
dataTypes.set("21.T11148/82e2503c49209e987740", {'name': 'checksum', 'class':'fa-solid fa-hashtag', 'renderer': Renderer.Text});
dataTypes.set("21.T11148/29f92bd203dd3eaa5a1f", {'name': 'dateCreated', 'class':'fa-solid fa-file-circle-plus', 'renderer': Renderer.Text});
dataTypes.set("21.T11148/b8457812905b83046284", {'name': 'digitalObjectLocation', 'class':'fa-solid fa-location-dot', 'renderer': Renderer.Url});
dataTypes.set("21.T11148/c692273deb2772da307f", {'name': 'version', 'class':'fa-solid fa-timeline', 'renderer': Renderer.Text});
dataTypes.set("21.T11148/1c699a5d1b4ad3ba4956", {'name': 'digitalObjectType', 'class':'fa-solid fa-file-image', 'renderer': Renderer.Hdl});
dataTypes.set("21.T11148/2f314c8fe5fb6a0063a8", {'name': 'licenseUrl', 'class':'fa-solid fa-closed-captioning', 'renderer': Renderer.Url});
dataTypes.set("21.T11148/d0773859091aeb451528", {'name': 'hasMetadata', 'class':'fa-solid fa-file-import', 'renderer': Renderer.Hdl});
dataTypes.set("21.T11148/4fe7cde52629b61e3b82", {'name': 'isMetadataFor', 'class':'fa-solid fa-file-export', 'renderer': Renderer.Hdl});
dataTypes.set("21.T11148/1a73af9e7ae00182733b", {'name': 'contact', 'class':'fa-solid fa-address-card', 'renderer': Renderer.Url});
//AI
dataTypes.set("21.T11148/59071da0d09ae46f1126", {'name': 'label', 'class':'fa-solid fa-tag', 'renderer': Renderer.Text});
dataTypes.set("21.T11148/bca3915764ce207253f5", {'name': 'imageFormat', 'class':'fa-solid fa-image', 'renderer': Renderer.Text});
dataTypes.set("21.T11148/49330041ca5fddf9af92", {'name': 'schemaLocation', 'class':'fa-solid fa-file-circle-exclamation', 'renderer': Renderer.Url});

//BIO
dataTypes.set("pid", {'name': 'pid', 'class':'fa-solid fa-fingerprint', 'renderer': Renderer.Url});
dataTypes.set("pidIssuer", {'name': 'pidIssuer', 'class':'fa-solid fa-address-card', 'renderer': Renderer.Object});
dataTypes.set("pidKernelMetadataLicense", {'name': 'pidKernelMetadataLicense', 'class':'fa-solid fa-closed-captioning', 'renderer': Renderer.Url});
dataTypes.set("digitalObjectType", {'name': 'digitalObjectType', 'class':'fa-solid fa-file-image', 'renderer': Renderer.Object});
dataTypes.set("digitalObjectSubtype", {'name': 'digitalObjectSubtype', 'class':'fa-solid fa-file-image', 'renderer': Renderer.Object});

export interface ProfileEntry {
    name: string;
    color: string;
    icon: string;
}

export const profiles = new Map<string, ProfileEntry>();
//Helmholtz KIP
profiles.set("21.T11148/b9b76f887845e32d29f7", {"name": "HelmholtzKIP", "color": "#ee7222", "icon": "\u0048"});
//Helmholtz KIP annotation
profiles.set("21.T11148/828b74888f3774d97f73", {"name": "HelmholtzKIP for Annotation", "color": "#ffa222", "icon": "\uf02b"});
//Helmholtz KIP MultiType
profiles.set("21.T11148/863d938d632b53d62d52", {"name": "HelmholtzKIP for Multitype", "color": "#ffb266", "icon": "\uf126"});
//Image Type
profiles.set("21.T11148/0e76292794888d4f1fa7", {"name": "Image", "color": "#00ff66", "icon": "\uf03e"});
//JSON File
profiles.set("21.T11148/91cc47c47bbd1eb8b943", {"name": "JSON", "color": "#aaff66", "icon": "\uf1c9"});
//File
profiles.set("21.T11148/2c3cafa4db3f3e1e51b3", {"name": "File", "color": "#aadd99", "icon": "\uf15b"});
