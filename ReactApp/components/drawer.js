import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import SideMenu from './menu';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import {StyleSheet} from 'react-native'

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
                type="displace"
                content={<SideMenu />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                 main: { opacity:(2-ratio)/2 }
            })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
            
        );
    } 
}

const drawerStyles = StyleSheet.create({
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: { paddingLeft: 3 },
})

export default SideDrawer