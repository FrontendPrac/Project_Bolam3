import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function TodayBooks() {
  const navigation = useNavigation();
  const goAdd = () => {
    navigation.navigate("Stacks", { screen: "Add" });
  };

  const goRecommend = () => {
    navigation.navigate("Stacks", { screen: "Recommend" });
  };

  const [bookApiImg, setbookApiImg] = useState("");
  const [bookApiTitle, setBookApiTitle] = useState("");
  const [bookApiAuthor, setBookApiAuthor] = useState("");
  const [bookApiContent, setBookApContent] = useState("");

  const getBooks = async () => {
    try {
      const bookApi = await axios.get(
        `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbsoojae10291105001&QueryType=BlogBest&MaxResults=1&start=1&SearchTarget=Book&output=JS&Version=20131101`
      );
      const aaa = JSON.parse(bookApi.request._response);
      setbookApiImg(aaa.item[0].cover);
      setBookApiTitle(aaa.item[0].title);
      setBookApiAuthor(aaa.item[0].author);
      setBookApContent(aaa.item[0].description);
    } catch (error) {
      console.log("Error가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  // const goDetail = () => {
  //   navigate("Stacks", { screen: "Detail" });
  // };

  // const goDetailEdit = () => {
  //   navigate("Stacks", { screen: "DetailEdit" });
  // };

  return (
    <View>
      <MainToDayTitle>오늘의 추천 도서</MainToDayTitle>
      <ToDay onPress={goRecommend}>
        <ToDayImg
          source={{
            uri: bookApiImg,
          }}
        />
        <TodayText>
          <ToDayTitle numberOfLines={1} ellipsizeMode="tail">
            {bookApiTitle}
          </ToDayTitle>
          <ToDayOuter numberOfLines={1} ellipsizeMode="tail">
            {bookApiAuthor}
          </ToDayOuter>
          <ToDayContents numberOfLines={8} ellipsizeMode="tail">
            {bookApiContent}
          </ToDayContents>
        </TodayText>
      </ToDay>
      <AddBook>책 추가하기</AddBook>
      <AddBookBack>
        <AddBookBtn onPress={goAdd}>
          <AntDesign name="pluscircleo" size={50} color="black" />
        </AddBookBtn>
      </AddBookBack>
    </View>
  );
}

export default TodayBooks;

const MainToDayTitle = styled.Text`
  margin-top: 10px;
  font-size: 25px;
  color: ${(props) => props.theme.text};
`;

const ToDay = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 15px;
  background-color: #e2d9ce;
  padding: 20px;
  border-radius: 10px;
`;

const TodayText = styled.View`
  padding-left: 20px;
`;

const ToDayTitle = styled.Text`
  width: 140px;
  font-size: 20px;
  font-weight: 500px;
  margin-bottom: 5px;
`;

const ToDayOuter = styled.Text`
  width: 140px;
  font-size: 11px;
  font-weight: 400px;
  text-align: right;
  margin-bottom: 5px;
`;

const ToDayContents = styled.Text`
  width: 140px;
  font-size: 13px;
`;

const ToDayImg = styled.Image`
  width: 150px;
  height: 200px;
`;

const AddBook = styled.Text`
  margin-top: 10px;
  font-size: 25px;
  color: ${(props) => props.theme.text};
`;

const AddBookBack = styled.View`
  background-color: #e2d9ce;
  height: 160px;
  border-radius: 25px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddBookBtn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;
