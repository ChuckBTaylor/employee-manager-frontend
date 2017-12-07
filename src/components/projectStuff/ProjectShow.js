import React, { Component } from 'react';
import cuid from 'cuid';
import { findByID } from '../../helpers/generalHelpers'
import { Button } from 'semantic-ui-react';
import MinifiedPieceForm from '../pieceStuff/MinifiedPieceForm'
import MinifiedPieceModal from '../pieceStuff/MinifiedPieceModal';

class ProjectShow extends Component {
  state = {
    pieceModalOpen: false,
    selectedPiece: -1
  }
  handleEditClick = () => {
    this.props.onEditClick()
  }

  onModalClose = () => {
    this.setState({pieceModalOpen: false, selectedPiece: -1})
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick()
  }

  handleNewPieceClick = () => {
    this.props.onNewPieceClick()
  }

  getPieceServiceIDs = () => {
    return this.props.procedures.filter(proc => proc.pieceID === this.state.selectedPiece).map(proc => proc.serviceID)
  }

  handlePieceClick = ev => {
    this.setState({pieceModalOpen: true, selectedPiece: +ev.target.dataset.pieceID})
  }
  render (){
    return (
      <div className='six wide column'>
        <h2>{this.props.project.name}</h2>
        <h3>{this.props.client.name}</h3>
        <div className='ui middle aligned selection list'>
          {this.props.pieces.map(piece => {
            return(
              <div className='item' key={cuid()}>
                <i className='shipping' />
                <div className='content'>
                  <div className='header' data-piece-i-d={piece.id} onClick={this.handlePieceClick}>{piece.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <MinifiedPieceForm project={this.props.project}/>
        <MinifiedPieceModal
          piece={findByID(this.props.pieces, this.state.selectedPiece)}
          modalOpen={this.state.pieceModalOpen}
          onModalClose={this.onModalClose}
          project={this.state.project}
          pieceServiceIDs={this.getPieceServiceIDs()}
        />
        <br /><br />
        <Button onClick={this.handleEditClick} > Edit {this.props.project.name}</Button>
      </div>
    )
  }
}

ProjectShow.defaultProps = {
  project: {},
  pieces: [],
  procedures: []
}

export default ProjectShow
