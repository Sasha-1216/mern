const initialIssues = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title: 'Error in console when clicking Add'
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2018-08-16'),
    due: new Date('2018-08-30'),
    title: 'Missing bottom border on panel'
  }
];

class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the issue filter.</div>;
  }
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New'
    };
    this.props.createIssue(issue);
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <form name='issueAdd' onSubmit={this.handleSubmit}>
        <input type='text' name='owner' placeholder='owner'></input>
        <input type='text' name='title' placeholder='title'></input>
        <button>Add</button>
      </form>
    );
  }
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;

    return (
      <tr>
        <td> {issue.id} </td>
        <td> {issue.status} </td>
        <td> {issue.owner} </td>
        <td> {issue.created.toDateString()} </td>
        <td> {issue.effort} </td>
        <td> {issue.due ? issue.due.toDateString() : ''} </td>
        <td> {issue.title} </td>
      </tr>
    );
  }
}

class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => (
      <IssueRow key={issue.id} issue={issue} />
    ));

    return (
      <table className='bordered-table'>
        <thead>
          <tr>
            <th> ID </th>
            <th> Status </th>
            <th> Owner </th>
            <th> Created </th>
            <th> Effort </th>
            <th> Due Date </th>
            <th> Title </th>
          </tr>
        </thead>

        <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ issues: initialIssues });
    }, 500);
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter></IssueFilter>
        <hr></hr>
        <IssueTable issues={this.state.issues}></IssueTable>
        <hr></hr>
        <IssueAdd createIssue={this.createIssue}></IssueAdd>
      </React.Fragment>
    );
  }
}

const element = <IssueList />; // not necessary //JSX must have one parent element

ReactDOM.render(element, document.getElementById('contents'));
