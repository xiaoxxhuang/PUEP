1. What is branching strategy?

    Branching strategy is a software development team employs when writing, merging, and shipping code in the context of a version control system.

2. Why need branching strategy?

    Ensure everyone on the team following same process for making changes to source control.
    - typical development workflow
    - emergency hotfixes
    - small vs large changes
    - standard vs experimental changes

3. Git Flow

    GitFlow has numerous, longer-lived branches and larger commits. Developers create a feature branch and delay merging it to the main trunk branch until the feature is complete.

    - `main` branch stores official release history
    - `develop` branch servers integration branch for features
    - `feature` branches use `develop` as parent branch. When feature complete, gets merged back to `develop`. `feature` branch never get interact with `main` branch
    - `release` branch forked once `develop` has acquired enough features for a release. Based on `develop`, once ready to ship (ideal place for PR), gets merged into both `main` and `develop`.
    -  `hotfix` branches are used to quickly patch production releases. Based on `main`, needs merged into both `main` and `develop`.

    Reference: git-flow.png

4. GitHubFlow

    GitHub Flow is a simple alternative to GitFlow.
    GitHub Flow treats every change as a feature branch, fewer moving parts than GitFlow.

    - `master` branch is stable, always deployable
    - `descriptively named` branches off of master. Push to the named branches constantly. Open the PR any time, merge only after PR review and deploy immediately after review.

    Reference: github-flow.png

5. Trunk-based Development

    Trunk-based development is a version control management practice where developers merge small, frequent updates to a core trunk or main branch. Since it streamlines merging and integration phases, it is a common practice among DevOps teams. It required practive of CI/CD. Changes are done more frequently to the trunk, often multiple times a day (CI) which allows features to be released much faster (CD).

    This strategy is often combined with feature flags. As the trunk is always kept ready for release, feature flags help decouple deployment from release so any changes that are not ready can be wrapped in a feature flag and kept hidden while features that are complete can be released to end-users without delay. 

6. GitFlow vs Trunk-based Developement

| Branching Strategy |   GitFlow| GitHub Flow   | Trunk-based Development   |
|---|---|---|---|
| Branching Overhead | Heavy |Light |Light|
| Complexity | High  |  Low |  Low |
|  Code Integration | Until whole features completed | Every change as a feature branch | Continuous, Small changes everyday |
| Code Review | Releases | Continuous | Continuous |
| Merge Conflict Difficulty | Stress for long-lived branches, suffer 'merge hell'  | Easy  |  Easy |
| Delivery Cadence | Releases | Continuous | Continuous |
| Deployment Trigger | Release Cycle | Approved PR | Merge to main |
| Production Cycle | Long | Shortest | Short |
| Risk of production staying unstable | Less posibility | Possible | Less possiblity |
| Production Issues | Rollback | Quick fix via feature branch | Feature toggles | 
| Feedback timeline | Long and slow | Fast | Fast |




