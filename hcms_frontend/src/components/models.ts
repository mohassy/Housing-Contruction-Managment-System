
export class Stakeholder {
    id: number;
    name: string;
    role: string;

    constructor({ id, name, role }: { id: number; name: string; role: string }) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}

export class Task {
    id: number;
    description: string;
    date_due: Date | string;
    assigned_stakeholder: Stakeholder;
    complete: boolean;

    constructor({ id, description, date_due, assigned_stakeholder, complete }: {
        id: number;
        description: string;
        date_due: Date | string;
        assigned_stakeholder: Stakeholder;
        complete: boolean
    }) {
        this.id = id;
        this.description = description;
        this.date_due = date_due;
        this.assigned_stakeholder = assigned_stakeholder;
        this.complete = complete;
    }
}
