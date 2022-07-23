import { useContext } from 'react';
import { FooterShowContext } from '../context/FooterShowProvider';
import FooterShowContextInterface from '../interfaces/FooterShowContextInterface';

const useFooterShow = () => {
    return useContext(FooterShowContext) as FooterShowContextInterface;
};
export default useFooterShow;
