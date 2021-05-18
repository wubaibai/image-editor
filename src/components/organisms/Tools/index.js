import React, { useRef } from 'react';
import { SketchPicker } from 'react-color';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import BrushIcon from '@material-ui/icons/Brush';
import CropIcon from '@material-ui/icons/Crop';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';

import useRedux from 'utils/hooks/useRedux';
import { setSelectedTool, setAttribute } from 'actions/tools';
import style from './index.css';

const settings = {
	move: <OpenWithIcon />,
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
	const [
		{ tools },
		{ setSelectedTool: setSelectedToolAction, setAttribute: setAttributeAction },
	] = useRedux(mapHooksToState, {
		setSelectedTool,
		setAttribute,
	});

	const anchorRef = useRef(null);
	const [colorTarget, setColorTarget] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	const togglePicker = event => {
		const targetNode = event.target.closest('[data-type]');
		anchorRef.current = targetNode;
		setColorTarget(targetNode.getAttribute('data-type'));
		setOpen(true);
	};

	const handleChangeComplete = color => {
		setAttributeAction({
			type: colorTarget,
			value: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
		});
		setOpen(false);
	};

	const handleClose = () => setOpen(false);

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
			<Popover
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
			>
				<SketchPicker
					color={tools.attributes[colorTarget]}
					onChangeComplete={handleChangeComplete}
				/>
			</Popover>
			<IconButton style={{ color: tools.attributes.fill }} data-type="fill" onClick={togglePicker}>
				<FormatColorFillIcon />
			</IconButton>
			<IconButton
				style={{ color: tools.attributes.stroke }}
				data-type="stroke"
				onClick={togglePicker}
			>
				<BorderColorIcon />
			</IconButton>
			<IconButton
				style={{ color: tools.attributes.fillText }}
				data-type="fillText"
				onClick={togglePicker}
			>
				<FormatColorTextIcon />
			</IconButton>
		</div>
	);
};

export default Tools;
