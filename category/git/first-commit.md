# First Push to GitHub

This is my first push to GitHub. I am learning how to use Git and GitHub. I am following the instructions from the course "Version Control with Git" by Atlassian on Coursera.

## Create a new repository on the command line

- Create a new directory and init the git repository on mine local machine

  ```bash
  git init
  ```

## Git commit

- Add the files to the staging area.

  ```bash
  git add *
  ```

- Commit the changes.

  ```bash
  git commit -m "Initial commit"
  ```

## Create a new repository on GitHub

- Go to GitHub and create a new repository

## Add an origin remote

- Add the origin remote to the local repository

  ```bash
  git remote add origin https://github.com/your-repo/your-project
  ```

- Verify the remote

  ```bash
  git remote -v
  ```

- Example output

  ```bash
  origin  https://github.com/your-repo/your-project (fetch)
  origin  https://github.com/your-repo/your-project (push)
  ```

## Git pull

- When you first push, the local repository and the remote repository may not have a common history. In this case, you need to pull the content of the remote repository to the local repository before you can push.

  ```bash
  remote: Enumerating objects: 3, done.
  remote: Counting objects: 100% (3/3), done.
  remote: Compressing objects: 100% (2/2), done.
  remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
  Unpacking objects: 100% (3/3), 2.78 KiB | 316.00 KiB/s, done.
  From https://github.com/your-repo/your-project
   * [new branch]      main       -> origin/main
  There is no tracking information for the current branch.
  Please specify which branch you want to merge with.
  See git-pull(1) for details.

    git pull <remote> <branch>

  If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> main

  ```

  ### Method 1

  > Set the upstream branch of the local repository to the remote repository

  - Set the upstream branch of the local repository to the remote repository

    ```bash
    git branch --set-upstream-to=origin/main main
    ```

  - Example output

    ```bash
    branch 'main' set up to track 'origin/main'.
    PS D:\Projects\test> git pull
    fatal: refusing to merge unrelated histories
    ```

  ### Method 2

  > Pull and merge the remote main branch to the local main branch

  1. Make sure you are on the correct branch of your local repository:

     ```bash
     git checkout main
     ```

  2. Pull the remote main branch to the local main branch:

     ```bash
     git pull origin main --allow-unrelated-histories
     ```

  - Example output

    ```bash
    From https://github.com/your-repo/your-project
    * branch            main       -> FETCH_HEAD
    Merge made by the 'recursive' strategy.
    ```

    ```bash
    remote: Enumerating objects: 3, done.
    remote: Counting objects: 100% (3/3), done.
    remote: Compressing objects: 100% (2/2), done.
    remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
    Unpacking objects: 100% (3/3), 2.78 KiB | 316.00 KiB/s, done.
    From https://github.com/your-repo/your-project
    * branch            main       -> FETCH_HEAD
    * [new branch]      main       -> origin/main
    Auto-merging README.md
    CONFLICT (add/add): Merge conflict in README.md
    Automatic merge failed; fix conflicts and then commit the result.
    ```

  - Explanation

    - `git pull origin main`: Pull the latest changes from the `main` branch of the remote repository `origin` to the local repository.
    - `--allow-unrelated-histories`: Allow the pull even if the local repository and the remote repository do not have a common history.

  - If there are conflicts between the local repository and the remote repository, need to resolve these conflicts before committing.

## Git push

- Maybe need to specify the remote repository and branch when pushing for the first time

  ```base
  fatal: The current branch main has no upstream branch.
  To push the current branch and set the remote as upstream, use

      git push --set-upstream origin main

  To have this happen automatically for branches without a tracking
  upstream, see 'push.autoSetupRemote' in 'git help config'.
  ```

- Push the current branch and set the remote as upstream

  ```bash
  git push --set-upstream origin main
  ```

- Example output

  ```bash
  Enumerating objects: 5, done.
  Counting objects: 100% (5/5), done.
  Delta compression using up to 8 threads
  Compressing objects: 100% (3/3), done.
  Writing objects: 100% (3/3), 289 bytes | 289.00 KiB/s, done.
  Total 3 (delta 2), reused 0 (delta 0)
  remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
  To https://github.com/your-repo/your-project.git
  * [new branch]      main -> main
  Branch 'main' set up to track remote branch 'main' from 'origin'.
  ```

- Push successfully
