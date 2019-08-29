
function createIssueTemplate({ id, status, description, severity, assignedTo }) {
  return (
      `<div class="card">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Issue ID: ${id}</h6>
          <span class="badge badge-${(status === "open") ? 'primary': 'success'}">${status}</span>
          <h5 class="card-title">${description}</h5>
          <div>
            <p class="card-text" style="display: inline-block"><i class="fas fa-cog"></i> ${severity}</p>
            <p class="card-text" style="display: inline-block"><i class="far fa-user"></i> ${assignedTo}</p>
          </div>
          <a href="#" class="btn btn-info" onclick="setStatusClosed('${id}')">Close</a>
          <a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</a>
        </div>
      </div>
      <br>`
  );
}

function issuesList() {
  const issuesLists = localStorage.getItem('issues');
  return  issuesLists ? JSON.parse(issuesLists) : [];
}

function fetchIssues(){
  const issues = this.issuesList();
  const issuesList = document.getElementById('list');
  let issueListHtml = '';

  if (issues) {
      issues.forEach(element => issueListHtml += createIssueTemplate(element));
  }

  issuesList.innerHTML = issueListHtml;    
}

function saveIssue(e) {
  e.preventDefault();
  const id = chance.guid();
  const description = document.getElementById('description').value || 'No Description Provided';
  const severity = document.getElementById('severity').value;
  const assignedTo = document.getElementById('assignedTo').value || 'No User Assigned.';  
  const issues =  this.issuesList();

  issues.push({
    id,
    description,
    severity,
    assignedTo,
    status: 'open'
  });

  localStorage.setItem('issues', JSON.stringify(issues))
 
  fetchIssues();
}


function setStatusClosed (id) {
  const issues = this.issuesList(); 
 
  if (issues.length) {
      const updateIssue = issues.find(issueToClose => issueToClose.id === id);

      const indOf = issues.indexOf(updateIssue)
      issues.splice(indOf, 1)
      issues.push({
          id: updateIssue.id,
          description: updateIssue.description,
          severity: updateIssue.severity,
          assignedTo: updateIssue.assignedTo,
          status: 'closed'
      })

      localStorage.setItem('issues', JSON.stringify(issues));

      fetchIssues();
  }
}

function deleteIssue (id) {
  const issues = this.issuesList();
  
  if (issues.length) {
      const issueToDelete = issues.find(issueToFind => issueToFind.id === id);

      const indOf = issues.indexOf(issueToDelete)
      issues.splice(indOf, 1)
      localStorage.setItem('issues', JSON.stringify(issues));

      fetchIssues();
  }
}
