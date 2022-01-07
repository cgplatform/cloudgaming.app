

export class ModalController {
    private readonly modals: Map<string, any>;

    constructor() {
        this.modals = new Map();
    }

    public closeModal(id: string) {
        if (!this.modals.has(id)) return;
        this.modals.get(id).close();
    }

    public openModal(id: string) {
        if (!this.modals.has(id)) return;

        this.modals.get(id).open();
    }

    public modalEvent(event: any) {
        this.modals.set(event.id, event.instance);
    }
}