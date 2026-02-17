export interface Sprint {
  number: number
  title: string
  startDate: string
  endDate: string
  status: 'completed' | 'active' | 'upcoming'
  description: string | undefined
}

export const sprints: Sprint[] = [
  {
    number: 0,
    title: 'Project Planning',
    startDate: '2026-01-21',
    endDate: '2026-02-03',
    status: 'completed',
    description: 'In this sprint, the focus was mainly on planning the structure for our project and preparing for the first presentation. In this, we decided on the project model we are gonna follow and assigned group roles for each of the members. Creating templates for documents, a group contract, and specifying our stakeholder requirements were also a part of this sprint. We now have the basis we need to continue with the concept for our project and the technical work. All this work led up to the first presentation and delivering all current documentation before it.'
  },
  {
    number: 1,
    title: 'Inception: Brainstorming',
    startDate: '2026-02-04',
    endDate: '2026-02-17',
    status: 'active',
    description: 'Getting familiar with existing solutions, stakeholder requirements, and landing on a concept or narrowing down to 2-3 candidates for the next sprint. Establishing a solid project risk management method. Completing our part of the profiling article, finalizing the website structure and its content, setting up the report framework, and finishing the Notion workspace.'
  },
  {
    number: 2,
    title: 'Elaboration: Concept Selection',
    startDate: '2026-02-18',
    endDate: '2026-03-03',
    status: 'upcoming',
    description: undefined,
  },
  {
    number: 3,
    title: 'Elaboration: First Concept MVP',
    startDate: '2026-03-04',
    endDate: '2026-03-17',
    status: 'upcoming',
    description: undefined,
  },
  {
    number: 4,
    title: 'Construction: -',
    startDate: '2026-03-18',
    endDate: '2026-03-31',
    status: 'upcoming',
    description: undefined,
  },
  {
    number: 5,
    title: 'Construction: -',
    startDate: '2026-04-07',
    endDate: '2026-04-19',
    status: 'upcoming',
    description: undefined,
  },
  {
    number: 6,
    title: 'Construction: -',
    startDate: '2026-04-20',
    endDate: '2026-05-03',
    status: 'upcoming',
    description: undefined,
  },
  {
    number: 7,
    title: 'Transition: -',
    startDate: '2026-05-04',
    endDate: '2026-05-17',
    status: 'upcoming',
    description: undefined,
  },
  {
    number: 8,
    title: 'Transition: -',
    startDate: '2026-05-18',
    endDate: '2026-05-31',
    status: 'upcoming',
    description: undefined,
  }
]
