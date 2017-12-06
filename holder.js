<Route path='/clients/new' render={props => (<ClientForm {...props} />) } />

<ClientList onSelectClient={this.props.selectClient} clients={this.props.clients} />

{this.hasSelectedClient() > 0 ? (<Route path='/clients' render={() => <ClientShow client={this.props.selectedClient} projects={this.props.clientProjects} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} onSelectProject={this.onSelectProject} onNewProjectClick={this.onNewProjectClick} />} />) : null}
</div>
<Route exact path='/clients' render={() => (<button onClick={this.handleNewClientClick} >New Client</button>) } /><br />
<ClientModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} client={this.props.selectedClient} />
