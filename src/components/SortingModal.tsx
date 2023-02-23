import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';

import TouchableImage from './TouchableImage';
import {sortDescending} from '../utils/helpers.js';

type SortingOptionType = {
  label: string;
  imageSource: any; // try ImageProps,
  identifier: string;
};

type SortItemType = {
  item: SortingOptionType;
  totalData: Array<any>;
  setData: Dispatch<SetStateAction<never[]>>;
  onClose: () => void;
  sortOption: string;
  setSortOption: (arg: string) => void;
  onSort: () => void;
  isLast: boolean;
};

type SortingModalType = {
  data: Array<any>;
  setData: Dispatch<SetStateAction<never[]>>;
  onSort: () => void;
};

const sortingOptions: Array<SortingOptionType> = [
  {
    label: 'Stars',
    imageSource: require('../icons/stars.png'),
    identifier: 'stargazers_count',
  },
  {
    label: 'Watchers Count',
    imageSource: require('../icons/watchers.png'),
    identifier: 'watchers_count',
  },
  {
    label: 'Score',
    imageSource: require('../icons/score.png'),
    identifier: 'score',
  },
  {
    label: 'Created At',
    imageSource: require('../icons/createdAt.png'),
    identifier: 'created_at',
  },
  {
    label: 'Updated At',
    imageSource: require('../icons/updatedAt.png'),
    identifier: 'updated_at',
  },
];

const SortItem = ({
  item,
  totalData,
  setData,
  onClose,
  setSortOption,
  sortOption,
  onSort,
  isLast,
}: SortItemType) => (
  <Pressable
    style={[styles.sortItemWrapper, isLast ? styles.noBorder : styles.border]}
    onPress={() => {
      setData(sortDescending(totalData, item.identifier));
      onClose();
      setSortOption(item.identifier);
      onSort();
    }}>
    <Image source={item.imageSource} style={styles.sortImage} />
    <Text style={styles.textStyle}>{item.label}</Text>
    {item.identifier === sortOption && (
      <Image
        source={require('../icons/selected.png')}
        style={styles.checkedImage}
      />
    )}
  </Pressable>
);

const SortingModal = ({data, setData, onSort}: SortingModalType) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState('');
  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalVisible(false);
        }}>
        <Pressable
          disabled={data?.length < 1 ? true : false}
          onPress={() => setIsModalVisible(false)}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>Sort</Text>
            {sortingOptions?.map((item, index) => (
              <SortItem
                sortOption={sortOption}
                key={item?.identifier}
                item={item}
                setData={setData}
                totalData={data}
                onClose={() => setIsModalVisible(false)}
                setSortOption={setSortOption}
                onSort={onSort}
                isLast={index === sortingOptions?.length - 1}
              />
            ))}
          </View>
        </Pressable>
      </Modal>
      <TouchableImage source="sort" onPress={() => setIsModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0e0e0e50',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {backgroundColor: '#F194FF'},
  buttonClose: {backgroundColor: '#2196F3'},
  textStyle: {
    textAlign: 'left',
    paddingLeft: 16,
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    height: 30,
    width: 30,
  },
  sortImage: {
    height: 26,
    width: 26,
  },
  checkedImage: {
    height: 24,
    width: 24,
    marginLeft: 'auto',
  },
  sortItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: '#ECECEC',
  },
  border: {borderBottomWidth: 1},
  noBorder: {borderBottomWidth: 0},
});

export default SortingModal;
