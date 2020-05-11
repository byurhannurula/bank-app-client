import React from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'

import './styles.scss'

const Modal = React.memo(
  ({ confirmModal, header, children, closeModal, submitModal, isVisible }) => {
    const domEl = document.getElementById('modal-root')

    if (!domEl) return null

    return createPortal(
      <div
        className={cn('modal', { 'is-visible': isVisible })}
        data-animation="on"
      >
        <div className="modal-content">
          <header className="modal-header">
            <h3>{header}</h3>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <div className="modal-body">{children}</div>
          {confirmModal && (
            <footer className="modal-footer">
              <button type="button" className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="btn" onClick={submitModal}>
                Submit
              </button>
            </footer>
          )}
        </div>
      </div>,
      domEl,
    )
  },
)

Modal.displayName = 'Modal'

export default Modal
