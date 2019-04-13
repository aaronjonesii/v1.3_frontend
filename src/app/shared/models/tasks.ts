export class Tasks {
    model: string;
    pk: number;
    fields: Task;
}

export class Task {
    ident: string;
    created: string;
    updated: string;
    start_date: string;
    due_date: string;
    title: string;
    description: string;
    priority: PRIORITIES;
    status: STATUSES;
    tags: string;
    owner: number;
}

export type PRIORITIES =
    | 'HIGH'
    | 'MEDIUM'
    | 'LOW';

export type STATUSES =
    | 'COMPLETED'
    | 'IN_PROGRESS'
    | 'TODO'
    | 'UP_NEXT'
    | 'BACKLOG';
