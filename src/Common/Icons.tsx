import React from "react";

type Actions = 'ic_action_fav' | "ic_action_more_horizontal";

export type APIcons = Actions

export default function APIcon(props: {
    alt?: string,
    iconName: APIcons, size?: number, onClick?: (args?: any) => any, color?: string
}) {

    return (
        <img src={`/img/${props.iconName}.svg`} alt={props.alt} /* width={props.size} height={props.size}  */ onClick={props.onClick} style={{ maxWidth: props.size, maxHeight: props.size, cursor: props.onClick ? 'pointer' : undefined, fill: props.color }} />
    )
}