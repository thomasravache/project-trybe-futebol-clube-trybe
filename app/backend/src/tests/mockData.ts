export const matchs = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: {
      clubName: "São Paulo"
    },
    awayClub: {
      clubName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: {
      clubName: "São Paulo"
    },
    awayClub: {
      clubName: "Internacional"
    }
  },
  {
    id: 3,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: {
      clubName: "Corinthians"
    },
    awayClub: {
      clubName: "Internacional"
    }
  }
] as any[];

export const clubs = [
  {
    id: 1,
    clubName: 'São Paulo',
    homeMatchs: [
      {
        id: 1,
        homeTeam: 1,
        homeTeamGoals: 1,
        awayTeam: 2,
        awayTeamGoals: 0,
        inProgress: true,
      }
    ],
    awayMatchs: [
      {
        id: 2,
        homeTeam: 2,
        homeTeamGoals: 1,
        awayTeam: 1,
        awayTeamGoals: 0,
        inProgress: false,
      },
    ],
  },
  {
    id: 2,
    clubName: 'Corinthians',
    homeMatchs: [
      {
        id: 1,
        homeTeam: 2,
        homeTeamGoals: 1,
        awayTeam: 1,
        awayTeamGoals: 0,
        inProgress: false,
      }
    ],
    awayMatchs: [
      {
        id: 2,
        homeTeam: 1,
        homeTeamGoals: 1,
        awayTeam: 2,
        awayTeamGoals: 0,
        inProgress: true,
      },
    ],
  },
] as any;

// export const users = [
//   {
//     id: 1,
//     username: 'Admin',
//     role: 'admin',
//     email: 'admin@admin.com.br',
//     password: '',
//   },
//   {
//     id: 2,
//     username: 'User',
//     role: 'user',
//     email: 'user@user.com.br',
//     password: '',
//   },
// ] as UserModel[];
