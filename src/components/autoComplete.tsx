
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
// import { colors } from '../../theme/color'
import Cross from '../../../public/cross.svg'
import { colors, shades } from '../theme/color'

interface porpTypes {
  dataList?: string[]
  clearAble?: boolean
  onClick?: () => void
}

const demoData: string[] = [
  'The Shawshank',
  'The Godfather',
  "1972",
  'The Godfather',
  "1974",
  'The Dark Knight',
  "2008",
  '12 Angry Men',
  "1957",
  "Schindler's List",
  "1993",
  'Pulp Fiction',
  'The Lord of the',
  "2003",
  'The Good, the Bad',
  "1966",
  'Fight Club',
  "1999",
]

const ImageWrapper = styled.span`
  position: absolute;
  left: 11.4rem;
  top: 0.6rem;
  filter: invert(68%) sepia(0%) saturate(1%) hue-rotate(65deg) brightness(101%) contrast(100%);

  cursor: pointer;
  transition: all .2s ease-in-out;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`


const AutoCompleteContainer = styled.div`
  width: 13rem; 
  position: relative;

  
  & > input {
    width: 13rem;
    height: 2.5rem;
    padding: 0rem 0.5rem;
    border: 1px solid grey;
    border-radius: 5px;


    &:focus {
      /* border: 1px solid rgba(81, 203, 238, 1); */
      box-shadow: 0 0 2px #51eeac;
      outline: 1px solid #51eeac;
    }
  }

  & > div {

    display: none;

    width: inherit;
    /* height: 100px; */
    max-height: 100px;
    overflow-x: hidden;
    overflow-y:  scroll;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    position: absolute ;
    /* top: 2px; */
    z-index: 15;

    /* border: 1px solid white; */

    
    & > ul  {
      width: inherit;
      text-align: center;

      & > li  {
        height: 2rem;
        padding: 0.2rem 0rem;
        list-style-type: none;
      }
      & > li:hover  {
        list-style-type: none;
        color: white ;
        background-color: #d9d9d9;
      }
    }
    ::-webkit-scrollbar {
      width: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 1px grey; 
      border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background:  ${colors.primaryColor} ; 
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${shades.blue2};
    }

  }

  .show {
    display: block;
  }
  .activeList {
    list-style-type: none;
    color: white ;
    background-color: #d9d9d9;
  }

`

const DropDownContainer = styled.div`
  display: none;

width: inherit;
/* height: 100px; */
max-height: 100px;
overflow-x: hidden;
overflow-y:  scroll;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
position: absolute ;
/* top: 2px; */
z-index: 15;

/* border: 1px solid white; */


& > ul  {
  width: inherit;
  text-align: center;

  & > li  {
    height: 2rem;
    padding: 0.2rem 0rem;
    list-style-type: none;
  }
  & > li:hover  {
    list-style-type: none;
    color: white ;
    background-color: #d9d9d9;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px grey; 
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background:  ${colors.primaryColor} ; 
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${shades.blue2};
  }
  
`

export const AutoComplete = (props: porpTypes) => {

  // const [dataList, setDataList] = useState<string>("")

  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const [activeList, setActiveList] = useState<string[]>(demoData)
  const [filterList, setFilterList] = useState<string[]>([])
  const [userInput, setUserInput] = useState<string>("")

  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<any>(null);


  useEffect(() => {
    document.body.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside)
    };
  }, [])


  const onChangeHandle = (e: any) => {

    let found = activeList.filter(elem =>
      elem.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );

    setShowDropdown(true)
    setUserInput(e.target.value)
    setFilterList(found)

  }

  const onClickOutside = (e: any) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      setShowDropdown(false)
    }
  }

  const onClickHandle = (e: any) => {
    // console.log("target value is", e.target.innerText);
    // console.log("target value is", filterList);
    setUserInput(e.target.innerText)
    setShowDropdown(false)
  }

  const handleFocus = (e: any) => {
    if (activeList.length) {
      setShowDropdown(previousState => previousState === false && true)
    }
  }

  const [currentFocus, setCurrentFocus] = useState<number>(0)
  const [scrollValue, setscrollValue] = useState<number>(0)

  const removeClassAcitveList = () => {
    filterList.forEach((val, index) => {
      listRef.current?.childNodes[index].classList.remove("activeList");
    })
  }

  const moveScroll = (elem: any) => {
    elem.current.scrollTop = scrollValue
  }

  const onKeyDownHandle = (e: any) => {

    // onkeyEnter
    if (e.keyCode === 13) {
      setUserInput(filterList[currentFocus - 1])
      setShowDropdown(false)
    }
    // onkeyup
    if (e.keyCode === 38) {
      if (currentFocus >= 0) {
        removeClassAcitveList();
        listRef.current?.childNodes[currentFocus].classList.add("activeList");
        if (scrollValue < 180) {
          moveScroll(dropDownRef)
          setscrollValue(previousValue => previousValue - 25);
        }
        setCurrentFocus(previousCount => previousCount - 1);
      } else {
        setCurrentFocus(filterList.length - 1)
        setscrollValue(175)
      }
    }

    // onkeydown
    if (e.keyCode === 40) {
      if (currentFocus < filterList.length && listRef.current) {
        removeClassAcitveList();
        listRef.current?.childNodes[currentFocus].classList.add("activeList");
        if (scrollValue < 180) {
          moveScroll(dropDownRef)
          setscrollValue(previousValue => previousValue + 25);
        }
        setCurrentFocus(previousCount => previousCount + 1);
      } else {
        setCurrentFocus(0)
        setscrollValue(0)
      }

    }
  }

  const clearInput = () => {
    setUserInput("");
  }


  return (
    <AutoCompleteContainer  >
      <input autoComplete='off' id="input" onChange={onChangeHandle} value={userInput} onKeyDown={onKeyDownHandle} onFocus={handleFocus} />

      <div className={showDropdown ? "autoCompleteDropDown show" : " autoCompleteDropDown"} ref={dropDownRef} >
        <ul ref={listRef}>
          {
            activeList.length === 0 ?
              activeList.map((val, index) => (
                <li key={index} onClick={onClickHandle} value={val}  >{val}</li>
              )) : filterList.map((val, index) => (
                <li key={index} onClick={onClickHandle} value={val} >{val}</li>
              ))
          }
        </ul>
      </div>

      <ImageWrapper onClick={clearInput}>
        {/* {userInput && <Image src={Cross} width={"15px"} height={"18px"}></Image>} */}
      </ImageWrapper>

    </AutoCompleteContainer >
  )
}

