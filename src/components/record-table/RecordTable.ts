import { ColumnDefinition, TabulatorFull as Tabulator } from 'tabulator-tables';
import { createTooltip, renderCell, renderValuePlain } from './ColumnHelpers';
import { HandleRecordValue } from '../../services/handleapi/handle-record-entry';
import { getPIDRecord } from '../../services/handleapi/handleapi';
import * as tabulatorStyles from "!!to-string-loader!css-loader!tabulator-tables/dist/css/tabulator.min.css";
import * as tabulatorStylesMat from "!!to-string-loader!css-loader!tabulator-tables/dist/css/tabulator_materialize.min.css";
import * as fontawesome from "!!to-string-loader!css-loader!@fortawesome/fontawesome-free/css/all.min.css";

/** Table columns for interactive mode */
export const INTERACTIVE_COLUMNS: ColumnDefinition[] = [
    {
        title: "Index",
        field: "index",
        width: 100
    },
    {
        title: "Type",
        field: "type",
        formatter: renderCell,
        //tooltip: createTooltip,
        width: 300
    },
    {
        title: "Value",
        field: "data.value",
        //formatter: renderCell
    }
];

/** Table columns for plain mode */
export const PLAIN_COLUMNS: ColumnDefinition[] = [
    {
        title: "IIndex",
        field: "index",
        width: 100
    },
    {
        title: "Type",
        field: "type",
        formatter: renderValuePlain,
        tooltip: createTooltip,
        width: 300
    },
    {
        title: "Value",
        field: "data.value",
        formatter: renderValuePlain
    }
];


export class RecordTable extends HTMLElement {
    /** >>> HTML ATTRIBUTES */
    public interactive: boolean = false;
    public height: number = 0;
    public pid: string = "";
    /** <<< HTML ATTRIBUTES */
    private tabulatorElement: HTMLDivElement;
    private tabulator: Tabulator|null = null;
    private tableIsBuild = false;

    constructor() {
        super();

        this.tabulatorElement = document.createElement("div");
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = `
            <style>${tabulatorStyles}</style>
            <style>${tabulatorStylesMat}</style>
            <style>${fontawesome}</style>
        `;
        shadowRoot.append(this.tabulatorElement);
    }
    
    public static get observedAttributes() {
        return ["pid", "interactive", "height"];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case "pid":
                this.pid = newValue;
                if (oldValue !== newValue) this.handlePIDUpdate();
                break;
            case "interactive":
                this.interactive = (newValue === "true");
                break;
            case "height":
                this.height = parseInt(newValue);
                break;
        }
        this.updateTable();
    }

    private handlePIDUpdate() {
        if (!this.pid) return;
        getPIDRecord(this.pid)
            .then((entries: HandleRecordValue[]) => {
                if (!this.tableIsBuild || !this.tabulator) return;
                this.tabulator.setData(entries);
            })
            .catch(error => console.log(error));
    }

    private updateTable() {
        if (!this.tableIsBuild || !this.tabulator) return;
        this.tabulator.setColumns(this.interactive ? INTERACTIVE_COLUMNS : PLAIN_COLUMNS);
        this.tabulator.setHeight(this.height);
    }

    public connectedCallback() {
        this.tabulator = new Tabulator(this.tabulatorElement, {
            columns: this.interactive ? INTERACTIVE_COLUMNS : PLAIN_COLUMNS,
            layout: "fitColumns",
            height: `${this.height}px`
        });
        this.tabulator.on("tableBuilt", () => {
            this.tableIsBuild = true;
            this.updateTable();     // initial table update
            this.handlePIDUpdate(); // initial PID fetch
        });
    }

    // destructor, called when component is removed from DOM
    public disconnectedCallback() {
        this.tabulator?.destroy();
        this.tabulatorElement.innerHTML = '';
        this.tableIsBuild = false;
    }
}

customElements.define("record-table", RecordTable);