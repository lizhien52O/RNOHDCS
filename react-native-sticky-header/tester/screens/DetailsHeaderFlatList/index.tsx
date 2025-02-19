import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import type {RootStackNavigationProp} from '../../navigation/types';
import {colors, screenStyles} from '../../constants/index';
import {ROUTES, CHILDROUTES} from '../../navigation/routes';
import {ExampleLink} from '../RouteCenterScreen/ExampleLink';
// 引入日志截图
import workletCode from '../../assets/DetailsHeaderFlatListWorkletCode.png';
import workletRunlog from '../../assets/DetailsHeaderWorkletLog.png';
//引入组件测试demo
import DetailsHeaderFlatListDemoDefault from './DefaultDemo/index';
import DetailsHeaderFlatListDemoChild1 from './TestDemo/ChildDemo1';
import DetailsHeaderFlatListDemoChild2 from './TestDemo/ChildDemo2';
//定义组件测试testID
const testIdObject = {
  default: 'DetailsHeaderFlatListDemoScreenDefault_testID',
  child1: 'DetailsHeaderFlatListDemoScreenChild1_testID',
  child2: 'DetailsHeaderFlatListDemoScreenChild2_testID',
};
const defaultRouter = {
  routeName: CHILDROUTES.DetailsHeaderFlatListDemoDefault,
  label: 'DetailsHeaderFlatList默认组件',
  testID: testIdObject.default,
  title: '默认组件DetailsHeaderFlatListDemoDefault(设置基准属性值)',
  testProps: {
    backgroundColor: 'rgb(78,15,255)',
    containerStyle: `flex:1设置弹性布局`,
    contentIcon: '左下角人物头像左侧的背景白色处的icon图标',
    contentIconNumber: '左下角人物头像左侧的背景白色处的icon图标右边的数字10',
    contentIconNumberStyle:
      '设置左下角人物头像左侧的背景白色处的icon图标右边的数字10的样式，设置文字颜色为黑色',
    contentIconNumberTestID: '测试用例id值，用作唯一标识符，传递即生效',
    enableSafeAreaTopInset: 'true',
    leftTopIcon: '左上角icon图标',
    leftTopIconOnPress: '左上角icon图标点击触发回调',
    hasBorderRadius: 'true',
    headerHeight: '默认值100',
    onHeaderLayout: 'header布局完成后，由组件内部自动调用',
    onTopReached: '触顶事件回调，由组件内部自动调用',
    parallaxHeight: '300(默认值53%屏幕高度)',
    image: 'Brandon.image(左上角的头像)',
    renderHeaderBar: '默认组件使用默认headerBar',
    rightTopIcon: '右上角icon图标',
    rightTopIconOnPress: '右上角icon图标点击触发回调',
    renderHeaderBar: '自定义headerBar,背景色红色，白色文字',
    snapStartThreshold: '默认值',
    stickyTabs: 'true',
    tag: 'Product Design的文字',
    tagStyle: 'Product Design的文字样式,设置文字颜色为白色',
    tagTestID: '测试唯一标识符，传递即生效',
    title: 'Brandon',
    titleStyle: `color:'black'`,
    subtitle: '左下角子标题的文字内容brand sub title',
    subtitleStyle: '设置文字颜色为白色',
    subtitleTestID: '测试唯一标识符，传递即生效',
  },
};
const childRouter1 = {
  routeName: CHILDROUTES.DetailsHeaderFlatListDemoChild1,
  label: 'DetailsHeaderFlatList测试子组件1',
  testID: testIdObject.child1,
  title: '测试组件DetailsHeaderFlatListDemoChild1(设置对比属性值)',
  testProps: {
    backgroundColor: 'rgb(255,78,65)',
    contentContainerStyle: `backgroundColor:'red'`,
    containerStyle: `borderWidth:1;borderColor:'green'`,
    title: 'BrandonChild1',
    titleStyle: `color:'green'`,
    data: 'FlatList组件必传属性，内部已生效',
    keyExtractor: 'FlatList组件必传属性，内部已生效',
    renderItem: 'FlatList组件Item渲染函数，内部已生效',
  },
};
const childRouter2 = {
  routeName: CHILDROUTES.DetailsHeaderFlatListDemoChild2,
  label: 'DetailsHeaderFlatList测试子组件2',
  testID: testIdObject.child2,
  title: '测试组件DetailsHeaderFlatListDemoChild2(设置对比属性值)',
  testProps: {
    enableSafeAreaTopInset:
      'false（设置为false,表现headerBar部分会减少内边距）',
  },
};

const SimpleTable = props => {
  const Keys = Object.keys(props.obj);
  return (
    <View style={styles.tableContainer}>
      <View style={[styles.tableHeaderContainer, styles.lineBase]}>
        <Text>测试属性Prop</Text>
        <Text>Prop值/含义</Text>
      </View>
      {Keys.map((key, index) => (
        <View key={`${key}-${index}`} style={styles.lineBase}>
          <Text>{key}</Text>
          <Text>{props.obj[key]}</Text>
        </View>
      ))}
    </View>
  );
};
const showCallbackInfo = {
  onMomentumScrollBegin:
    ':内部已调用，组件动画响应滑动手势依赖该回调(log日志筛选关键词：DetailsHeaderFlatList-worklet)',
  onMomentumScrollEnd:
    ':内部已调用，组件动画响应滑动手势依赖该回调(log日志筛选关键词：DetailsHeaderFlatList-worklet)',
  onScroll:
    ':内部已调用，组件动画响应滑动手势依赖该回调(log日志筛选关键词：DetailsHeaderFlatList-worklet)',
  onScrollBeginDrag:
    ':内部已调用，组件动画响应滑动手势依赖该回调(log日志筛选关键词：DetailsHeaderFlatList-worklet)',
  onScrollEndDrag:
    ':内部已调用，组件动画响应滑动手势依赖该回调(log日志筛选关键词：DetailsHeaderFlatList-worklet)',
};
const DetailsHeaderFlatListDemoScreen: React.FC = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.primaryBlue}
          translucent
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>DetailsHeaderFlatList组件测试页面</Text>
          </View>
          <ScrollView>
            <View style={styles.testCenter}>
              <View style={styles.sectionPart}>
                <Text>{defaultRouter.title}</Text>
                <SimpleTable obj={defaultRouter.testProps}></SimpleTable>
                <Text>测试链接：</Text>
                <ExampleLink key={defaultRouter.routeName} {...defaultRouter} />
              </View>
              <View style={styles.sectionPart}>
                <Text>{childRouter1.title}</Text>
                <SimpleTable obj={childRouter1.testProps}></SimpleTable>
                <Text>测试链接：</Text>
                <ExampleLink key={childRouter1.routeName} {...childRouter1} />
              </View>
              <View style={styles.sectionPart}>
                <Text>{childRouter2.title}</Text>
                <SimpleTable obj={childRouter2.testProps}></SimpleTable>
                <Text>测试链接：</Text>
                <ExampleLink key={childRouter2.routeName} {...childRouter2} />
              </View>
              <View style={styles.sectionPart}>
                <Text>单独展示相关回调方法测试结果</Text>
                <SimpleTable obj={showCallbackInfo}></SimpleTable>
                <Text>测试结果展示：</Text>
                <Image style={styles.testImage} source={workletCode}></Image>
                <Image style={styles.testImage} source={workletRunlog}></Image>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(193, 95%, 68%)',
  },
  header: {
    width: '100%',
    padding: 20,
    textAlign: 'center',
  },
  testCenter: {
    paddingBottom: 200,
  },
  sectionPart: {
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 20,
  },
  linkLabel: {
    color: colors.purplishBlue,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 20,
    padding: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
  },
  lineBase: {
    width: '100%',
    lineHeight: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },
  tableHeaderContainer: {
    fontWeight: 700,
    fontSize: 18,
  },
});

export default DetailsHeaderFlatListDemoScreen;
export {
  DetailsHeaderFlatListDemoDefault,
  DetailsHeaderFlatListDemoChild1,
  DetailsHeaderFlatListDemoChild2,
};
