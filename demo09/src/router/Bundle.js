import Lazyload from './Lazyload.js';
import React from 'react';
export default (component) =>() => (
	<Lazyload load={component}>
		{
			(Component) => Component?<Component />:false
		}
	</Lazyload>
)