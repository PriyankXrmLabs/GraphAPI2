import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'GraphApiWebPartStrings';
import GraphApi from './components/GraphApi';
import { IGraphApiProps } from './components/IGraphApiProps';
import { PropertyPaneDropdown, PropertyPaneSlider} from '@microsoft/sp-property-pane';


export interface IGraphApiWebPartProps {
  description: string,
  dropdownField: string,
  bgfield:string,
  speed: number,
  texttodisplay: string,
  colorfield: string
}





export default class GraphApiWebPart extends BaseClientSideWebPart<IGraphApiWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IGraphApiProps> = React.createElement(
      GraphApi,
      {
        Properties: this.properties,        
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }


  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          // header: {
          //   description: strings.PropertyPaneDescription
          // },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('texttodisplay', {
                  label: 'Enter Text to display'
                }),
                PropertyPaneDropdown('dropdownField', {
                  label: 'Choose Direction',
                  options: [
                    { key: 'left', text: 'Right to Left' },
                    { key: 'right', text: 'Left to Right' },
                    { key: 'up', text: 'Down to Up' },
                    { key: 'down', text: 'Up to Down' }
                  ]
                }),
                // PropertyPaneDropdown('colorfield', {
                //   label: 'Choose Text Color',
                //   options: [
                //     { key: 'red', text: 'Red' },
                //     { key: 'blue', text: 'Blue' },
                //     { key: 'green', text: 'Green' },
                //     { key: 'yellow', text: 'Yellow' },
                //     { key: 'purple', text: 'Purple' },
                //     { key: 'orange', text: 'Orange' },
                //     { key: 'pink', text: 'Pink' },
                //     { key: 'black', text: 'Black' },
                //     { key: 'white', text: 'White' },
                //     { key: 'grey', text: 'Grey' },
                //     { key: 'brown', text: 'Brown' },
                //     { key: 'cyan', text: 'Cyan' },
                //     { key: 'magenta', text: 'Magenta' },
                //     { key: 'lime', text: 'Lime' },
                //     { key: 'maroon', text: 'Maroon' },
                //     { key: 'navy', text: 'Navy' },
                //     { key: 'olive', text: 'Olive' },
                //     { key: 'teal', text: 'Teal' },
                //     { key: 'violet', text: 'Violet' },
                //     { key: 'indigo', text: 'Indigo' },
                //     { key: 'gold', text: 'Gold' },
                //     { key: 'silver', text: 'Silver' },
                //     { key: 'coral', text: 'Coral' },
                //     { key: 'salmon', text: 'Salmon' },
                //     { key: 'khaki', text: 'Khaki' },
                //     { key: 'plum', text: 'Plum' },
                //     { key: 'orchid', text: 'Orchid' },
                //     { key: 'turquoise', text: 'Turquoise' },
                //     { key: 'sienna', text: 'Sienna' },
                //     { key: 'chocolate', text: 'Chocolate' }
                //   ]
                // }),
                PropertyPaneTextField('colorfield', {
                  label: 'Enter Text Color Value'
                }),
                PropertyPaneTextField('bgfield', {
                  label: 'Enter Background Color Value'
                }),
                // PropertyPaneDropdown('bgfield', {
                //   label: 'Choose Background Color',
                //   options: [
                //     { key: '#FF6347', text: 'Tomato' },
                //     { key: '#4682B4', text: 'SteelBlue' },
                //     { key: '#3CB371', text: 'MediumSeaGreen' },
                //     { key: '#FFD700', text: 'Gold' },
                //     { key: '#6A5ACD', text: 'SlateBlue' },
                //     { key: '#FF8C00', text: 'DarkOrange' },
                //     { key: '#FF69B4', text: 'HotPink' },
                //     { key: '#696969', text: 'DimGray' },
                //     { key: '#F5F5F5', text: 'WhiteSmoke' },
                //     { key: '#A9A9A9', text: 'DarkGray' },
                //     { key: '#8B4513', text: 'SaddleBrown' },
                //     { key: '#20B2AA', text: 'LightSeaGreen' },
                //     { key: '#FF00FF', text: 'Magenta' },
                //     { key: '#32CD32', text: 'LimeGreen' },
                //     { key: '#800000', text: 'Maroon' },
                //     { key: '#000080', text: 'Navy' },
                //     { key: '#808000', text: 'Olive' },
                //     { key: '#008080', text: 'Teal' },
                //     { key: '#EE82EE', text: 'Violet' },
                //     { key: '#4B0082', text: 'Indigo' },
                //     { key: '#DAA520', text: 'GoldenRod' },
                //     { key: '#C0C0C0', text: 'Silver' },
                //     { key: '#FF7F50', text: 'Coral' },
                //     { key: '#FA8072', text: 'Salmon' },
                //     { key: '#F0E68C', text: 'Khaki' },
                //     { key: '#DDA0DD', text: 'Plum' },
                //     { key: '#DA70D6', text: 'Orchid' },
                //     { key: '#40E0D0', text: 'Turquoise' },
                //     { key: '#A0522D', text: 'Sienna' },
                //     { key: '#D2691E', text: 'Chocolate' }
                //   ]
                  
                // }),
            
                PropertyPaneSlider('speed', {
                  label: 'Adjust Speed',
                  min: 1,
                  max: 100,
                  step: 1,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
