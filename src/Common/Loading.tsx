import { CircularProgress } from '@material-ui/core';
import { APCenter } from 'ap-components';
import React from 'react';

// export default function Loading() {
//     return (
//         <APCenter><CircularProgress></CircularProgress></APCenter>
//     )
// }

export default function Loading(props: any) {
    if (props.isLoading) {
        if (props.timedOut) {
            return <APCenter>Took too long. Please refresh the page...</APCenter>;
        } else if (props.pastDelay) {
            return <APCenter><CircularProgress></CircularProgress></APCenter>;
        } else {
            return null;
        }
    } else if (props.error) {
        return <APCenter>Unable to connect. Please refresh the page...</APCenter>;
    } else {
        return null;
    }
}