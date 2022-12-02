export function createDTRLink(pid: string, slot: string): HTMLAnchorElement {
    const anchor = createExternalLink(`https://dtr-test.pidconsortium.eu/#objects/${pid}`, slot);
    return anchor;
}

export function createExternalLink(href: string, slot: string): HTMLAnchorElement {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", href);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
    anchor.innerHTML = slot;

    return anchor;
}