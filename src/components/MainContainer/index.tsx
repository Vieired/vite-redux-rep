import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

type Props = {
    children?: React.ReactNode | React.ReactNode[];
};

const MainContainer: React.FC<Props> = ({ children }) => {

  const dispatch = useDispatch();

  useEffect(() => {

    const currentUser = localStorage?.getItem("user") && typeof(localStorage.getItem("user")) === "string"
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;

    if (new Date(currentUser?.stsTokenManager?.expirationTime) < new Date()) {
        signOut(auth).then(() => {
                // Signs out if the user's token is expired.
                dispatch(setUser(null));
                localStorage.clear();
            }).catch((error) => {
                console.log(error);
            });
    }
  }, [dispatch]);

  return (
    <>{children}</>
  );
};

export default MainContainer;