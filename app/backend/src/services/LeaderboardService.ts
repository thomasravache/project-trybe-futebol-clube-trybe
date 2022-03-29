import { LeaderBoardResponse, LeaderBoardType, ModelStatic } from '../@types/types';
import { IClubModel, IService, IClubModelAssociations } from '../@types/interfaces';
import ClubModel from '../database/models/ClubModel';
import MatchModel from '../database/models/MatchModel';

class LeaderboardService implements IService {
  public readonly model: ModelStatic<IClubModel>;

  private _leaderboard: LeaderBoardResponse[];

  private _leaderboardTypes: string[];

  private _clubs: IClubModelAssociations[];

  constructor(model: ModelStatic<IClubModel> = ClubModel) {
    this.model = model;
    this._leaderboardTypes = ['home', 'away', 'all'];
    this.refreshClubs();
  }

  private async refreshClubs(): Promise<void> {
    this._clubs = await this.model.findAll({
      include: [
        { model: MatchModel, as: 'homeMatchs', where: { inProgress: false } },
        { model: MatchModel, as: 'awayMatchs', where: { inProgress: false } },
      ],
    }) as IClubModelAssociations[];
  }

  public async getAll(): Promise<LeaderBoardResponse[]> {
    await this.refreshClubs();

    this.createLeaderboard(this._clubs, 'all');

    return this._leaderboard;
  }

  public async getAllHome(): Promise<LeaderBoardResponse[]> {
    await this.refreshClubs();

    this.createLeaderboard(this._clubs, 'home');

    return this._leaderboard;
  }

  public async getAllAway(): Promise<LeaderBoardResponse[]> {
    await this.refreshClubs();

    this.createLeaderboard(this._clubs, 'away');

    return this._leaderboard;
  }

  private createLeaderboard(clubs: IClubModelAssociations[], type: LeaderBoardType): void {
    this._leaderboard = clubs.map((club) => ({
      name: club.clubName,
      totalPoints: this.getTotalPoints(club, type),
      totalGames: this.getTotalGames(club, type),
      totalVictories: this.getVictories(club, type),
      totalDraws: this.getDraws(club, type),
      totalLosses: this.getLosses(club, type),
      goalsFavor: this.getGoalsFavor(club, type),
      goalsOwn: this.getGoalsOwn(club, type),
      goalsBalance: this.getGoalsFavor(club, type) - this.getGoalsOwn(club, type),
      efficiency: this.getEfficiency(club, type),
    })).sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  private getTotalGames(club: IClubModelAssociations, type: LeaderBoardType): number {
    const selectedTypeIndex = this._leaderboardTypes.findIndex((t) => t === type);

    const results = [
      club.homeMatchs.length,
      club.awayMatchs.length,
      club.homeMatchs.length + club.awayMatchs.length,
    ];
    return results[selectedTypeIndex];
  }

  private getVictories(club: IClubModelAssociations, type: LeaderBoardType): number {
    const selectedTypeIndex = this._leaderboardTypes.findIndex((t) => t === type);

    const homeVictories = club.homeMatchs.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const awayVictories = club.awayMatchs.reduce((acc, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const results = [homeVictories, awayVictories, homeVictories + awayVictories];

    return results[selectedTypeIndex];
  }

  private getDraws(club: IClubModelAssociations, type: LeaderBoardType): number {
    const selectedTypeIndex = this._leaderboardTypes.findIndex((t) => t === type);

    const homeDraws = club.homeMatchs.reduce((acc, curr) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const awayDraws = club.awayMatchs.reduce((acc, curr) => {
      if (curr.awayTeamGoals === curr.homeTeamGoals) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const results = [homeDraws, awayDraws, homeDraws + awayDraws];

    return results[selectedTypeIndex];
  }

  private getLosses(club: IClubModelAssociations, type: LeaderBoardType): number {
    const selectedTypeIndex = this._leaderboardTypes.findIndex((t) => t === type);

    const homeLosses = club.homeMatchs.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const awayLosses = club.awayMatchs.reduce((acc, curr) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const results = [homeLosses, awayLosses, homeLosses + awayLosses];

    return results[selectedTypeIndex];
  }

  private getGoalsFavor(club: IClubModelAssociations, type: LeaderBoardType): number {
    const selectedTypeIndex = this._leaderboardTypes.findIndex((t) => t === type);

    const homeGoalsFavor = club.homeMatchs.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

    const awayGoalsFavor = club.awayMatchs.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

    const results = [homeGoalsFavor, awayGoalsFavor, homeGoalsFavor + awayGoalsFavor];

    return results[selectedTypeIndex];
  }

  private getGoalsOwn(club: IClubModelAssociations, type: LeaderBoardType): number {
    const selectedTypeIndex = this._leaderboardTypes.findIndex((t) => t === type);

    const homeGoalsOwn = club.homeMatchs.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

    const awayGoalsOwn = club.awayMatchs.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

    const results = [homeGoalsOwn, awayGoalsOwn, homeGoalsOwn + awayGoalsOwn];

    return results[selectedTypeIndex];
  }

  private getTotalPoints(club: IClubModelAssociations, type: LeaderBoardType): number {
    return (this.getVictories(club, type) * 3) + this.getDraws(club, type);
  }

  private getEfficiency(club: IClubModelAssociations, type: LeaderBoardType): number {
    const totalPoints = this.getTotalPoints(club, type);
    const totalGames = this.getTotalGames(club, type);
    const efficiency = +(totalPoints / ((totalGames * 3) / 100)).toFixed(2);

    return efficiency;
  }
}

export default LeaderboardService;
