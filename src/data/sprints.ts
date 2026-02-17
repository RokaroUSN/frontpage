export interface Sprint {
  number: number
  title: string
  startDate: string
  endDate: string
  status: 'completed' | 'active' | 'upcoming'
  description: string
}

export const sprints: Sprint[] = [
  {
    number: 0,
    title: 'Project Planning',
    startDate: '2026-01-20',
    endDate: '2026-02-17',
    status: 'completed',
    description: 'In this sprint, the focus was mainly on planning the structure for our project and preparing for the first presentation. In this, we decided on the project model we are gonna follow and assigned group roles for each of the members. Creating templates for documents, a group contract, and specifying our stakeholder requirements were also a part of this sprint. We now have the basis we need to continue with the concept for our project and the technical work. All this work led up to the first presentation and delivering all current documentation before it.'
  },
  {
    number: 1,
    title: 'Inception',
    startDate: '2026-02-18',
    endDate: 'TBD',
    status: 'active',
    description: 'Getting familiar with existing solutions, stakeholder requirements, and landing on a concept — or narrowing down to 2–3 candidates for the next sprint. Establishing a solid project risk management method. Completing our part of the profiling article, finalizing the website structure and its content, setting up the report framework, and finishing the Notion workspace.'
  }
]
