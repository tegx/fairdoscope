import { CellComponent } from "tabulator-tables";
import { createDTRLink, createExternalLink } from "../../common/LinkCreator";
import { PIDStore } from '../../services/store';
import { dataTypes, Renderer } from "../../mappings";

/**
 * Renderer function for PID record table value cells. This function is used in interactive mode
 * to render the value cell for a selection of supported formats, e.g., URL, data type, FDO, and JSON.
 * @param {CellComponent} cell The current cell to render
 */
export function renderValueCell(cell: CellComponent, ): string | HTMLElement {
    const value = cell.getValue();

    const type = cell.getRow().getCells().at(1)?.getValue()
    if (dataTypes.has(type)) {
        const obj = dataTypes.get(type)!;
        if (obj.renderer === Renderer.Hdl) {
            return value; // this value is already a HTML Element created from the analyzePIDValue func
        } else if (obj.renderer === Renderer.Object) {
            let obj = JSON.parse(value);
            //TODO: Check id...currently, obtained value is https://hdl.handle.net/21...
            //obj.id.substr(obj.id.lastIndexOf(".net/") + 5)
            return createExternalLink(obj.id, obj.id);
        } else if (obj.renderer === Renderer.Url) {
            return createExternalLink(value, value);
        }
    }

    // same as obj.renderer === Renderer.Text
    // Notice: this value is show in the table, till "hdlCellRenderer" sets an analyzed value
    return renderValuePlain(cell);
}

/*
 * Analyzes a given PID if it belongs to a type FDO or another kind of FDO
 * Create either a link element (HTMLAnchorElement) which either links to DTR or fires an event
 */
export function analyzePIDValue(pid: string): Promise<string|HTMLElement> {
    return new Promise<string|HTMLElement>((resolve, reject) => {
        PIDStore.getPIDRecord(pid)
            .then(recordValues => {
                let isType = false;
                let isFairDO = false;
                let profilePid = null;

                for (let recordValue of recordValues) {
                    if (recordValue.type === "21.T11148/076759916209e5d62bd5") {
                        profilePid = recordValue.data.value;
                        isFairDO = true;
                        break;
                    } else if (recordValue.type === "0.TYPE/DOIPService") {
                        isType = true;
                        break;
                    }
                }

                if (isType) {
                    //TODO: Check if alternate location (view=ui) can be adressed instead of hardcoded link to GWDG
                    resolve(createDTRLink(pid, pid));
                } else if (isFairDO) {
                    //addChildFdo(type, value, profilePid, pid);
                    // create link element that throws an event instead of hyperlinking
                    const a = document.createElement("a");
                    a.className = "pid-change-link"
                    a.setAttribute("href", ""); // let the browser recognize it as link
                    a.setAttribute("data-pid", pid);
                    a.innerHTML = `${pid}&nbsp;<i class=\"fa-solid fa-arrows-rotate\"></i>`;
                    resolve(a);
                }
            })
            .catch(reject);
    })
}

/**
 * Renderer function for PID record table type-cells. This function is used in interactive mode
 * to render the type column to determine the type name obtained from 'js/mappings.js'
 * @param {CellComponent} cell The current cell to render
 */
export function renderTypeCell(cell: CellComponent): string | HTMLElement {
    const value = cell.getValue();
    if (dataTypes.has(value)) {
        const obj = dataTypes.get(value)!;
        return createDTRLink(value, `<i class="${obj.class}">&nbsp;</i>${obj.name}</a>`);
    }
    return value;
}

/**
 * Tooltip function basically returning the cell's value.
 *
 * @param {MouseEvent} event The tooltip event.
 * @param {CellComponent} cell The cell obtained from the table.
 */
export function createTooltip(event: MouseEvent, cell: CellComponent): string {
    const value = cell.getValue();
    if (dataTypes.has(value)) {
        return dataTypes.get(value)!.name;
    }
    return value + "";
}

/**
 * Plain render function basically returning the cell's value.
 *
 * @param {CellComponent} cell The cell obtained from the table.
 */
export function renderValuePlain(cell: CellComponent) {
    const value = cell.getValue();
    return typeof value !== "string" ? "" : value;
}