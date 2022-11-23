import { CellComponent } from "tabulator-tables";
import { dataTypes } from "../../mappings";

/**
 * Renderer function for PID record table cells. This function is used on the one hand for the type column to
 * determine the type name obtained from 'js/mappings.js' in interactive mode, on the other hand to render the
 * value cell for a selection of supported formats, e.g., URL, data type, FDO, and JSON.
 * @param {string} selection The selected object obtained from the table.
 */
export function renderCell(cell: CellComponent): string | HTMLElement {
    const value = cell.getValue();

    if (cell.getColumn().getField() == "type") {
        if (dataTypes.has(value)) {
            const obj = dataTypes.get(value)!;
            return `<a href="https://dtr-test.pidconsortium.eu/#objects/${value}" target="_blank" rel="noopener noreferrer"><i class="${obj.class}">&nbsp;</i>${obj.name}</a>`;
        }
    } else if (cell.getColumn().getField() == "data.value") {
        const type = cell.getRow().getCells().at(1)?.getValue()
        if (dataTypes.has(type)) {
            const obj = dataTypes.get(type)!;
            //return obj.renderer(type, value);
            return "obj.renderer(type, value)";
        }
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
    return cell.getValue();
}

/**
 * Plain render function basically returning the cell's value.
 *
 * @param {CellComponent} cell The cell obtained from the table.
 */
export function renderValuePlain(cell: CellComponent) {
    return cell.getValue();
}