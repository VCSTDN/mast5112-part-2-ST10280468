import React, {useState} from 'react';
import { Button,
           View,
           Image,
           useEffect,
          TouchableOpacity,
          TextInput,
          StyleSheet,
          ScrollView,
          Text,
          
          
          
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import 'react-native-gesture-handler';


// Declaring the functions of the following data from the async storage

function HomeScreen({ navigation }) {
  const{heading, setHeading} = useState('The Book App');
  const{subheading, setSubheading} = useState('Hello Welcome to Ebookz');
  const{title, setTitle} = useState('');
  const [lastBook, setLastBook] = useState('');
  const{author, setAuthor} = useState('');
  const{genre, setGenre} = useState('');
  const{totalPages, setTotalPages} = useState('');
  const{totalPagesNum, setTotalPagesNum} = useState('');
  const{averagePages, setAveragePages} = useState('');
  const{bookDetails, setBookdetails} = useState('');
  const [getValue, setGetValue] = useState('');
  
  //Define the function to get data from the async storage

  const GetData = async () => {
    try {
      //Get the books array from the async storage
      const books = await AsyncStorage.getItem('books')
      //Parse the books array into an object
      const booksObj =JSON.parse(books);

      if (booksObj && booksObj.length > 0) {
        const lastBook = booksObj[booksObj.length -1];
        setLastBook(lastBook);
      }
      //get the total pages from Async storage
    const totalPages = await AsyncStorage.getItem('totalPages');

    // get the total pages into a number
    const totalPagesNum = parseInt('totalPages')
    if(!isNaN(totalPagesNum)){
      setTotalPages(totalPagesNum);
    }

  // Get the averages per book from Async Storage
  const averagePages = await AsyncStorage.getItem('averagePages');
  // Parse the average pages per book
  const averagePagesNum = parseFloat(averagePages);
  if (!isNaN(averagePagesNum)) {
    setAveragePages(averagePagesNum);

  }
} catch (error){

    //handle any error that may occur whilst readind the async storage
    console.error(error);
  }
 
  };

  //Use effect to hook and retrive the data to load it

useEffect(() => {
  GetData();
}, []);


  return (
      <ScrollView style={style.scrollView}>
    <View style={{ flex: 1, backgroundColor:'#EBE6E6', alignItems: 'center', justifyContent: 'center' }}>

       {/* details of the opening of the book app displayed */}
     
      <View style={style.container}>

      <Text style={style.heading1}> The Book App</Text>
      <Text style={style.subheading}> Hello Welcome to Ebookz</Text>

      <Image source={require('part/logobook.png')}></Image>
      
      <Text style={style.subheading2}> Read Recently</Text>
      <Text style={style.subheading1}> Continue Reading </Text>

{/* details of the read recently book displayed */}

      <View style={style.container}>
      <View style={style.imageContainer}>

      <Image source={require('part/bookcover1.png')}></Image>

      <View style={style.textContainer}>
      <Text style={style.bookTitle}>Title: Don't look back{lastBook.title}</Text>
      <Text style={style.author}>Author: Isaac Nelson{lastBook.author}</Text>
      <Text style={style.genre}>Genre: Fantasy{lastBook.genre}</Text>
      <Text style={style.averagepages}>Average Pages: 502{lastBook.averagePages}</Text>
      <Text style={style.numPages}>Number Of Pages: 1256{lastBook.pages}</Text>
      </View>
      </View>
      </View>
      

     


   <View styles={style.container}>
       <TouchableOpacity 
        title="Go to Category Screen"
        style={style.Button}
        onPress={() => navigation.navigate('Category')}>
        <Text style={style.buttonText}>Genre</Text>
      </TouchableOpacity>

   
      <TouchableOpacity 
        title="Go to EnterBook Screen"
        style={style.Button}
        onPress={() => navigation.navigate('EnterBookScreen')}>
       <Text style={style.buttonText}>Enter Book</Text>
      </TouchableOpacity>

 
      <TouchableOpacity
        title="Go to History Screen"
        style={style.Button}
        onPress={() => navigation.navigate('History')}>
         <Text style={style.buttonText}>History</Text>
         </TouchableOpacity>


     
         </View>
      </View>
    </View>
    </ScrollView>


    
  );	
};


function EnterBookScreen({ navigation }) {
  const{heading, setHeading} = useState('The Book App');
  const{subheading, setSubheading} = useState('Hello Welcome to Ebookz');
  const{title, setTitle} = useState('');
  const{author, setAuthor} = useState('');
  const{genre, setGenre} = useState('');
  const{numPages, setNumPages} = useState('');
  const{averagepages, setAveragePages} = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState('');


// define the functions to save the data from the Async Storage
const saveData = async () => {
  //Validate the input fields for the display of the alert messages
  try{
    if (!title) {
      Alert.alert('Please enter the title');
      return;
    }
    if (!author) {
      Alert.alert('Please enter the title');
      return;
    }
    if (!genre) {
      Alert.alert('Please enter the title');
      return;
    }
    if (!pages  || isNaN(pages) || pages <= 0 ) {
      Alert.alert('Please enter  the valid number of the number of pages');
      return;
    }
    //create a book object
    const book ={
      title,
      author,
      genre,
      pages,
    };
    // get the arrays from the async storage
    const books = await AsyncStorage.getItem('books');
    //parse the books arrays into a javascript object
    const booksObj =JSON.parse(books);
    // if the books arrays is not empty, create a new array with the new book and save it
    if (booksObj && booksObj.length > 0){

      booksObj.push(book);
      await AsyncStorage.setItem('books', JSON.stringify(booksObj));
    } else{

      await AsyncStorage.setItem('books', JSON.stringify([book]));
    }
     //get the total pages from Async storage
     const totalPages = await AsyncStorage.getItem('totalPages');

     // Parse the total pages read into a number
     const totalPagesNum = parseInt(totalPages);
     
     if (!isNaN(totalPagesNum)){
      await AsyncStorage.setItem(
        'totalPages',
        (totalPagesNum + parseFloat(pages)).toString(),
      
      );

     } else{
      await AsyncStorage.setItem('totalPages', pages);
     }

     const averagePages = await AsyncStorage.getItem('averagePages');
     const averagePagesNum = parseFloat(averagePages);

     if(!isNaN(averagePagesNum)) {
      await AsyncStorage.setItem(
        'averagesPages',
        ((totalPagesNum + parseInt(pages)) / (booksObj.length + 1)).toString(),

      );
     } else{
      await AsyncStorage.setItem('averagePages', pages);

     }
   // Show successfull messages
   Alert.alert('Book saved successfully')
   navigation.goBack();
    } catch (error){
      console.error(error);
    }
     };
     


  

  const genreList = [
    {id: '1' ,name: 'Action and adventure', category: 'Fiction', count: 0},
    {id: '2' ,name: 'Alternate history', category: 'Fiction', count: 0},
    {id: '3' ,name: 'Anthology', category: 'Fiction', count: 0},
    {id: '4' ,name: 'Chick lit', category: 'Fiction', count: 0},
    {id: '5' ,name: 'Children', category: 'Fiction', count: 0},
    {id: '6' ,name: 'Classic', category: 'Fiction', count: 0},
    {id: '7' ,name: 'Comic book', category: 'Fiction', count: 0},
    {id: '8' ,name: 'Coming-of-age', category: 'Fiction', count: 0},
    {id: '9' ,name: 'Crime', category: 'Fiction', count: 0},
    {id: '10' ,name: 'Drama', category: 'Fiction', count: 0},
    {id: '11' ,name: 'Fairytale', category: 'Fiction', count: 0},
    {id: '12' ,name: 'Fantasy', category: 'Fiction', count: 0},
    {id: '13' ,name: 'Graphic novel', category: 'Fiction', count: 0},
    {id: '14' ,name: 'Historical fiction', category: 'Fiction', count: 0},
    {id: '15' ,name: 'Horror', category: 'Fiction', count: 0},
    {id: '16' ,name: 'Mystery', category: 'Fiction', count: 0},
    {id: '17' ,name: 'Paranormal romance', category: 'Fiction', count: 0},
    {id: '18' ,name: 'Picture book', category: 'Fiction', count: 0},
    {id: '19' ,name: 'Poetry', category: 'Fiction', count: 0},
    {id: '20' ,name: 'Political thriller', category: 'Fiction', count: 0},
    {id: '21' ,name: 'Romance', category: 'Fiction', count: 0},
    {id: '22' ,name: 'Satire', category: 'Fiction', count: 0},
    {id: '23' ,name: 'Science fiction', category: 'Fiction', count: 0},
    {id: '24' ,name: 'Short story', category: 'Fiction', count: 0},
    {id: '25' ,name: 'Suspense', category: 'Fiction', count: 0},
    {id: '26' ,name: 'Thriller', category: 'Fiction', count: 0},
    {id: '27' ,name: 'Western', category: 'Fiction', count: 0},
    {id: '28' ,name: 'Young adult', category: 'Fiction', count: 0},
    {id: '29' ,name: 'Art/architecture', category: 'Non-fiction', count: 0},
    {id: '30' ,name: 'Autobiography', category: 'Non-fiction', count: 0},
    {id: '31' ,name: 'Biography', category: 'Non-fiction', count: 0},
    {id: '32' ,name: 'Business/economics', category: 'Non-fiction', count: 0},
    {id: '33' ,name: 'Crafts/hobbies', category: 'Non-fiction', count: 0},
    {id: '34' ,name: 'Cookbook', category: 'Non-fiction', count: 0},
    {id: '35' ,name: 'Diary', category: 'Non-fiction', count: 0},
    {id: '36' ,name: 'Dictionary', category: 'Non-fiction', count: 0},
    {id: '37' ,name: 'Encyclopedia', category: 'Non-fiction', count: 0},
    {id: '38' ,name: 'Guide', category: 'Non-fiction', count: 0},
    {id: '39' ,name: 'Health/fitness', category: 'Non-fiction', count: 0},
    {id: '40' ,name: 'History', category: 'Non-fiction', count: 0},
    {id: '41' ,name: 'Home and garden', category: 'Non-fiction', count: 0},
    {id: '42' ,name: 'Humor', category: 'Non-fiction', count: 0},
    {id: '43' ,name: 'Journal', category: 'Non-fiction', count: 0},
    {id: '44' ,name: 'Math', category: 'Non-fiction', count: 0},
    {id: '45' ,name: 'Memoir', category: 'Non-fiction', count: 0},
    {id: '46' ,name: 'Philosophy', category: 'Non-fiction', count: 0},
    {id: '47' ,name: 'Prayer', category: 'Non-fiction', count: 0},
    {id: '48' ,name: 'Religion, spirituality, and new age', category: 'Non-fiction', count: 0},
    {id: '49' ,name: 'Textbook', category: 'Non-fiction', count: 0},
    {id: '50' ,name: 'True crime', category: 'Non-fiction', count: 0},
    {id: '51' ,name: 'Review', category: 'Non-fiction', count: 0},
    {id: '52' ,name: 'Science', category: 'Non-fiction', count: 0},
    {id: '53' ,name: 'Self help', category: 'Non-fiction', count: 0},
    {id: '54' ,name: 'Sports and leisure', category: 'Non-fiction', count: 0},
    {id: '55' ,name: 'Travel', category: 'Non-fiction', count: 0},
    {id: '56' ,name: 'True crime', category: 'Non-fiction', count: 0}
   ];
   

  

  return (
    <ScrollView style={style.scrollView}>
    <View style={{ flex: 1, backgroundColor:'#D55D5D', alignItems: 'center', justifyContent: 'center' }}>
    
       {/* details of the text input and search filed of the book app */}
      <View style={style.container}>
        <Text style={style.heading1}>EnterBook</Text>
        <Text style={style.subheading}>Check Out New Books And Novels !!!</Text>

       
    {/* the logo of the book app included with the text input for search */}
    <Image source={require('part/logobook.png')}></Image>
    <TextInput
    style={style.input}
    placeholder = "Search for Title, Author, Genre, Number Of Pages"
    keyboardType= "default"
   
    />
       <View style={style.container1}>
       <Image source={require('part/enterbookimage1.jpg')} style={style.image1}/>
       <Image source={require('part/enterbook2.jpg')} style={style.image1}/>
       </View>


      <View style={style.container}>
      <Text style={style.heading}>Picker </Text>
      <Picker
        style={style.pickers}
        selectedValue={genre}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
          {genreList.map(genre => <Picker.Item key = {genre.id} label={genre.name} value={genre.name}/>)}
       
      </Picker>
      <Text style={style.nText}>{selectedLanguage}</Text>
    </View>
  

      <TouchableOpacity 
        title="Go to Category Screen"
        style={style.Button}
        onPress={() => navigation.navigate('CategoryScreen')}>
       <Text style={style.buttonText}>Genre</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        title="Go to Home Screen"
        style={style.Button}
        onPress={() => navigation.navigate('HomeScreen')}>
       <Text style={style.buttonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        title="Go to History Screen"
        style={style.Button}
        onPress={() => navigation.navigate('HistoryScreen')}>
       <Text style={style.buttonText}>History</Text>
      </TouchableOpacity>

    </View>
    </View>
    </ScrollView>
  );
}

function HistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function CategoryScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EnterBookScreen" component={EnterBookScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


const style = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    },
    
    imageContainer: {
        alignItems: 'left',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent:'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#D55D5D',
        

      },
    
    textContainer: {
        alignItems: 'flex-end',
        marginLeft:10,
        backgroundColor: '#D55D5D',

      },
    

      bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
  
      },
      pickers:{
        height: 100,
        width: 150,
        fontSize: 32,
      },
      nText:{
        fontSize: 48,
        fontWeight: 'bold',
      },

      Image:{
        alignItems:'center',
       

      },

      scrollView:{ 
        width: '80',
      },
     
    
    heading1:{
    fontSize: 40,
    textAlign:'center',
    fontWeight: 'bold',
    textDecorationLine:'underline',
    },
    
    subheading:{
    fontSize: 25,
    textAlign:'center',
    fontWeight: 'bold',
    },

    subheading2:{
      fontSize: 25,
      fontWeight: 'bold',
      },

    author:{
      fontSize: 22,
      textAlign: 'left',
      fontWeight: 'bold',
      fontFamily: 'Arial',
    },
    image1:{
      width: 120,
      height: 160,
      margin:50,
    },

    container1:{
      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'center',
    },

    genre:{
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },


  buttonText: {
    color: '#000814', // Text color of the button
    fontSize: 18, // Font size of the button text
    textAlign: 'center', // Text alignment inside the button
  },

    averagepages:{
      textAlign: 'left',
      fontSize: 22,
      fontWeight: 'bold',
    },
     input:{
        width: '80%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#000000',
        marginTop: 30,
        margin:12,
        backgroundColor: '#F7DADA',
        fontSize: 18,
        borderWidth: 2,
        color: '#000000',
        paddingHorizontal: 20,
        marginBottom: 20,
     },

    numPages:{
      textAlign: 'left',
      fontSize: 22,
      fontFamily: 'Arial',
      fontWeight: 'bold',
    },
    subheading1:{
      fontSize: 22,
      fontFamily: 'Arial',
      textDecorationLine: 'underline',
      
      },
    
     Button:{
      fontSize: 18, 
      color: '#ffffff',
      backgroundColor: '#9CD8E2',
      padding: 8,
      height:40,
      borderWidth: 2,
      marginHorizontal:60,
      justifyContent:'center',
      borderColor: '#000000',
      marginTop: 32, 
      width:200,
     },

      Image:{
      width: 200,
      height:200,
      },
    
    
    buttonContainer: {
      margin: 20,
      color: 'light-blue',
    
      },
    output: {
		padding: 10, 
		textAlign: 'center',
	},
	button:{
		fontSize: 18, 
		color: '#ffffff',
		backgroundColor: '#9CD8E2',
		padding: 8,
    borderWidth: 2,
    borderColor: '#000000',
		marginTop: 32, 
		width: '100%',
	},
	btnText: {
		padding: 5,
		color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
		textAlign: 'center',
	},
	input1: {
		textAlign: 'center',
		height: 40, 
    fontSize: 18,
		width: '100%',
		borderWidth: 2, 
		borderColor: '#000000',

	},
    

});