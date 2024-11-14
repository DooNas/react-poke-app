import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

// Firebase를 활용해서 구글로그인 구현.
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../../firebase';


const NavBar = () => {

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState({});

  const { pathname } = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // // Q. UI를 통해 접근하는 경우 멀쩡하지만, URL을 통해 접근하는 경우 원복되는 이유는?
      // if(user) {
      //   navigate("/");
      // } else {
      //   navigate("/login");
      // }
      // // Thinking : dom의 기준이 자식 컴포넌트를 타고 가면 문제 없는데 url로 탈 경우 처음부터라서?
      //// /* A.
      //   비슷하지만 세부적으로는 url을 통해 호출할 경우 Page 전체가 리플레쉬되면서 onAuthStateChanged가 호출되며 다시 원복된다.
      //   하지만 UI의 컴포넌트를 통해 호출될 경우 일부만 리플레쉬 되면서 onAuthStateChanged가 호출되지 않아 원복되지 않고 접근되는 것이다.
      // */
      // 로그인 유무 체크
      if(!user) {
        navigate("/login");
      } else if(user && pathname === "/login") {
        navigate("/");
      }
    })
    return () => {
      unsubscribe();
    }
  }, [pathname])  // 경로 변경시 재호출 지정
  
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUserData({});
    })
    .catch(error => {
      alert(error.message);
    })
  }
  
  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      setUserData(result.user);
    })
    .catch(error => {
      console.log(error)
    })
  }
  const listener = () => {
    if(window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])
  

  return (
    <NavWrapper $show={show}>
      <Logo>
        <Image
          alt='Poke logo'
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
          onClick={()=>(window.location.href = "/")}
        />
      </Logo>

      {pathname === '/login' ? 
        (
          
          <Login onClick={handleAuth}>로그인</Login>
        ) : 
        
        <SingOut>
          <UserImg
            src={userData.photoURL}
            alt='user photo'
          />
          <Dropdown>
            <span onClick={handleLogout}> Sign out </span>
          </Dropdown>
        </SingOut>
      }
    </NavWrapper>
  )
}

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19,19,19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`

const SingOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  } 
`

const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: white;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

const Image = styled.img`
  cursor: pointer;
  width: 100%;
`

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  background-color: ${props => props.$show ? "#090b13" : "transparent"};
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
`

export default NavBar