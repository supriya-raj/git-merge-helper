# git-merge-helper
A utility package that reduces the manual work involved in merging github prs

Install
----

`npm install git-merge-helper`

Merge Command
---

`npm run merge`

Configuration
---

```
config/general
"merge_pr_prerequisites": {
 "labels": "bug"//Labels that the merging prs must be marked with, use a csv if multiple of them are required
},
"status_checks": {
 //All time intervals in milli seconds
 "time_required": "2000"//The apprx. amount of time it takes for a PR to marked with success status
}
  
config/secrets
"git-personal-access-token": "XXXXXX",//your personal access token
"repo": {
 "name": "octocat",
 "owner": "Hello-World"
}

  
