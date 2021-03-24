import React from 'react';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import BrushIcon from '@material-ui/icons/Brush';
import CropIcon from '@material-ui/icons/Crop';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import useRedux from 'utils/hooks/useRedux';
import { setSelectedTool } from 'actions/tools';
import style from './index.css';

const settings = {
	arrow: <ArrowRightAltIcon />,
	shape: <CropSquareIcon />,
	text: <TextFieldsIcon />,
	painter: <BrushIcon />,
	sizer: <CropIcon />,
};

const Tools = () => {
	const mapHooksToState = state => ({
		tools: state.tools,
	});
	const [{ tools }, { setSelectedTool: setSelectedToolAction }] = useRedux(mapHooksToState, {
		setSelectedTool,
	});

	return (
		<div className={style.tools}>
			{Object.keys(settings).map(name => (
				<IconButton
					key={name}
					color={name === tools.selected ? 'primary' : 'default'}
					onClick={() => setSelectedToolAction(name)}
				>
					{settings[name]}
				</IconButton>
			))}
			<Divider />
			<IconButton>
				<FormatColorFillIcon />
			</IconButton>
			<IconButton>
				<BorderColorIcon />
			</IconButton>
		</div>
	);
};

export default Tools;
