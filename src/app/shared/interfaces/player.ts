export interface Player {
  id: string;
  username: string;
  fragment: string;
  fullUsername?: string;
  points: number;
  isLeading?: boolean;
  isCzar: boolean;
}
