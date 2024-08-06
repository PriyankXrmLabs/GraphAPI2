import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IGraphApiWebPartProps } from "../GraphApiWebPart";

export interface IGraphApiProps {
  Properties: IGraphApiWebPartProps;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext
}


