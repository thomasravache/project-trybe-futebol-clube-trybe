type LeaderBoardResponse = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};

export type LeaderBoardType = 'home' | 'away' | 'all';

export default LeaderBoardResponse;
