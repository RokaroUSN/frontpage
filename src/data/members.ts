export interface TeamMember {
  name: string
  discipline: string
  role: string
  id: string
  photoScale?: number
  email?: string
  description?: string
  linkedin?: string
}
export const teamMembers: TeamMember[] = [
  { id: '01', name: 'Erling Østmo', discipline: 'Mechanical', role: 'Project Lead', photoScale: 1, linkedin: 'https://www.linkedin.com/in/erling-%C3%B8stmo-283a36131/' },
  { id: '02', name: 'Emory Eugene Høiensahl', discipline: 'Computer', role: 'Member', photoScale: 1, linkedin: 'https://www.linkedin.com/in/emory-eugene-høiensahl-5b1347187/' },
  { id: '03', name: 'Egil Kanstad', discipline: 'Mechanical', role: 'Member', photoScale: 1, linkedin: 'https://www.linkedin.com/in/egil-kanstad/' },
  { id: '04', name: 'Fredrik Skjelstad Ramskjell', discipline: 'Mechanical', role: 'Member', photoScale: 1.1, linkedin: 'https://www.linkedin.com/in/fredrik-ramskjell-b67865329/' },
  { id: '05', name: 'Lisa Fouad Petrus', discipline: 'Computer', role: 'Member', photoScale: 1, linkedin: 'https://www.linkedin.com/in/lisa-fouad-petrus-482381270/' },
  { id: '06', name: 'Syver Sandum Stensholt', discipline: 'Computer', role: 'Member', photoScale: 1, linkedin: 'https://www.linkedin.com/in/syver-sandum-stensholt/' },
]
