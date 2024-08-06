import * as React from 'react';
import styles from './GraphApi.module.scss';
import type { IGraphApiProps } from './IGraphApiProps';
import Hello  from './FunctionalComponent/Hello.js'
// import Content  from './FunctionalComponent/Content'

// import MarqueeWeb from './FunctionalComponent/MarqueeWebPart';

export default class GraphApi extends React.Component<IGraphApiProps, {}> {
  public render(): React.ReactElement<IGraphApiProps> {
    const {  
      // Properties,
      hasTeamsContext,
      
    } = this.props;

   
    return (
      <section className={`${styles.graphApi} ${hasTeamsContext ? styles.teams : ''}`}>
          {/* <h1>{Properties.dropdownField}</h1>
          <h1>{Properties.description}</h1>
          <h1>{`${Properties.toggleField}`}</h1>
          <h1>{Properties.speed}</h1>
          <h1>{Properties.texttodisplay}</h1> */}
          <Hello />   
          {/* <Content URL = {Properties.description}/> */}
 
            
          {/* <MarqueeWeb  data={Properties.texttodisplay} speed={Properties.speed} dir={Properties.dropdownField} color={Properties.colorfield} bg={Properties.bgfield}/> */}
        

      </section>

    );
  }
}




 





