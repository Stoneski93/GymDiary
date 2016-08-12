import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import SideMenu from './menu';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

class SideDrawer extends Component {
    constructor() {
        super();
    }
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                //onOpen={()=>Actions.refresh({key:state.key, open: true})}
                //onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="displace"
                content={<SideMenu />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                 main: { opacity:(2-ratio)/2 }
            })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    } 
}

export default SideDrawer