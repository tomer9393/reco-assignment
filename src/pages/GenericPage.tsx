import styled from 'styled-components'
import { useParams } from 'react-router-dom';

// Generic page for router navigation from app bar
const GenericPage: React.FC= () => {

    const { pageName } = useParams<{ pageName: string }>();

    return (
    <StyledWrapper>
        <StyledHeadline>{pageName}</StyledHeadline>
    </StyledWrapper>
    );
}

const StyledHeadline = styled.h3`
    height: 26px;
    top: 30px;
    left: 87.5px;
    gap: 0px;
    font-size: 20px;
    font-weight: 500;
    line-height: 25.6px;
    color: #4C4C4C;
`
const StyledWrapper = styled.div`
    padding: 20px 60px;
`

export default GenericPage;
  