import * as React from 'react';
import { Dimensions, Image, RefreshControl, Text, View } from 'react-native';
import { IColumnsHandles } from 'react-native-waterflow-list/src/Columns';
import WaterFlow from 'react-native-waterflow-list/src/';

const width = Math.round((Dimensions.get('screen').width - 30) / 2);

const getItemData = (() => {
  let id = 0;
  return () => {
    id++;
    const height = Math.ceil(Math.random() * 1000);
    return {
      id,
      text: Math.random(),
      image_path: '',
      height,
      width,
    };
  };
})();

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const itemDataFactory = () =>
  Array(10)
    .fill('')
    .map(() => getItemData());

interface IItem {
  id: number
  [index: string]: any
}

export default () => {
  const [data, setData] = React.useState<IItem[]>([]);
  const [loading, setLoading] = React.useState(false)

  const WaterFlowRef = React.useRef<IColumnsHandles>()
  const onLoadMore = React.useCallback(async () => {
    setLoading(true)
    await sleep(100);
    setLoading(false)
    return setData(data.concat(itemDataFactory()));
  }, [data]);
  const loadData = React.useCallback(async () => {
    await sleep(100);
    return setData(itemDataFactory());
  }, [data])

  React.useEffect(() => {
    setData(itemDataFactory());
  }, []);

  return (
    <WaterFlow
      ref={WaterFlowRef}
      data={data}
      keyForItem={item => item.id}
      numColumns={3}
      onEndReached={onLoadMore}
      /** 允许 heightForItem 为异步函数 */
      asyncHeightForItem={async item => {
        let height = 0
        console.log('waterflow-list1---asyncHeightForItem-------in')
    
        try {
          console.log('waterflow-list1---asyncHeightForItem-------try')
          height = await (new Promise<number>((resolve, reject) => {
          console.log('waterflow-list1---asyncHeightForItem-------await')
            Image.getSize(item.image_path, (_, imageHeight) => {
      
              console.log('waterflow-list1---asyncHeightForItem-------getSize')
              resolve(imageHeight)
            }, reject)
          }))
        } catch (err) { console.log({ err });
        console.log('waterflow-list1---asyncHeightForItem-------error')		 }
        console.log('waterflow-list1---asyncHeightForItem-------height'+height)
        return height;
      }}
	  heightForItem={item => {
            console.log('waterflow-list1---heightForItem-------'+item.height)
           return item.height;
       }}
      columnFlatListProps={{
        style: { marginHorizontal: 20, },
      }}
      columnsFlatListProps={{
        ListHeaderComponent: () => <View><Text>Hello every one</Text></View>,
        refreshControl: <RefreshControl
          style={{ zIndex: 10 }}
          refreshing={loading}
          onRefresh={() => {
            WaterFlowRef.current?.clear()
            loadData()
          }}
          tintColor={'green'}
        />
        ,
        style: { marginHorizontal: 10, },
      }}
      renderItem={({ item, index }) => {
        return renderItem(item);
      }}
    />
  );
};

const renderItem = item => {

  return (
    <View style={{ marginHorizontal: 5, paddingTop: 10 }}>
      <Image source={require('../../assets/placeholder2000x2000.jpg')} style={{ height: item.height, width: `100%` }}  />
      <Text>ID:{item.id}</Text>
      <Text>{item.text}</Text>
    </View>
  );
};