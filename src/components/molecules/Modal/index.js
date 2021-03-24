/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';

import style from './index.css';

const Modal = ({ visible = false, title = '', content = '', actions = '', onDismiss }) => {
	const render = () => {
		return (
			<div className={classnames(style.container, visible && style.visible)}>
				<div className={style.backdrop} onClick={onDismiss}>
					<div className={style.modal} onClick={e => e.stopPropagation()}>
						<div className={style.header}>
							<div className={style.title}>{title}</div>
							<div className={style.close} onClick={onDismiss}>
								<CloseIcon />
							</div>
						</div>
						<div className={style.content}>{content}</div>
						<div className={style.action}>{actions}</div>
					</div>
				</div>
			</div>
		);
	};

	return ReactDOM.createPortal(render(), document.querySelector('#modal'));
};

export default Modal;
