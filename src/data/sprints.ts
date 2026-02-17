export type SprintStatus = 'completed' | 'active' | 'upcoming'

export interface Sprint {
  number: number
  title: string
  startDate: Date
  endDate: Date
  description: string | undefined
}

export function getSprintStatus(sprint: Sprint): SprintStatus {
  const now = new Date()
  const start = sprint.startDate
  const end = new Date(sprint.endDate)
  // Include the entire end date (end of day)
  end.setHours(23, 59, 59, 999)

  if (now > end) return 'completed'
  if (now >= start && now <= end) return 'active'
  return 'upcoming'
}

export const sprints: Sprint[] = [
  {
    number: 0,
    title: 'Project Planning',
    startDate: new Date('2026-01-21'),
    endDate: new Date('2026-02-03'),
    description: 'In this sprint, the focus was mainly on planning the structure for our project and preparing for the first presentation. In this, we decided on the project model we are gonna follow and assigned group roles for each of the members. Creating templates for documents, a group contract, and specifying our stakeholder requirements were also a part of this sprint. We now have the basis we need to continue with the concept for our project and the technical work. All this work led up to the first presentation and delivering all current documentation before it.'
  },
  {
    number: 1,
    title: 'Inception: Brainstorming',
    startDate: new Date('2026-02-04'),
    endDate: new Date('2026-02-17'),
    description: 'Getting familiar with existing solutions, stakeholder requirements, and landing on a concept or narrowing down to 2-3 candidates for the next sprint. Establishing a solid project risk management method. Completing our part of the profiling article, finalizing the website structure and its content, setting up the report framework, and finishing the Notion workspace.'
  },
  {
    number: 2,
    title: 'Elaboration: Concept Selection',
    startDate: new Date('2026-02-18'),
    endDate: new Date('2026-03-03'),
    description: undefined,
  },
  {
    number: 3,
    title: 'Elaboration: First Concept MVP',
    startDate: new Date('2026-03-04'),
    endDate: new Date('2026-03-17'),
    description: undefined,
  },
  {
    number: 4,
    title: 'Construction: -',
    startDate: new Date('2026-03-18'),
    endDate: new Date('2026-03-31'),
    description: undefined,
  },
  {
    number: 5,
    title: 'Construction: -',
    startDate: new Date('2026-04-07'),
    endDate: new Date('2026-04-19'),
    description: undefined,
  },
  {
    number: 6,
    title: 'Construction: -',
    startDate: new Date('2026-04-20'),
    endDate: new Date('2026-05-03'),
    description: undefined,
  },
  {
    number: 7,
    title: 'Transition: -',
    startDate: new Date('2026-05-04'),
    endDate: new Date('2026-05-17'),
    description: undefined,
  },
  {
    number: 8,
    title: 'Transition: -',
    startDate: new Date('2026-05-18'),
    endDate: new Date('2026-05-31'),
    description: undefined,
  }
]
