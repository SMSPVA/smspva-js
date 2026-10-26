# Publishing to npm

The package is `smspva-sdk`; prereleases use the `alpha` distribution tag.

## Initial publication

The first release is published from a tested tarball using the maintainer's interactive npm CLI session and 2FA. No credential belongs in this repository. npm trusted publishing is configured through package settings after the package exists.

## Trusted publishing

Configure a GitHub trusted publisher for `SMSPVA/smspva-js`, workflow `publish.yml`, environment `npm`, allowing direct `npm publish`. The GitHub environment must require approval by `SMSPVA` and permit only `main`. The publishing job uses GitHub OIDC without a permanent npm token. The repository URL in `package.json` must match this repository.

## Subsequent releases

1. Update the version and changelog through a reviewed pull request, with CI passing before merge.
2. Manually run **Publish to npm** from `main`, entering the exact version.
3. Review the build, tests, declarations and tarball before approving deployment to `npm`.
4. The publishing job uploads the checked tarball under the `alpha` tag. Verify installation from the registry before announcing the release.

Do not overwrite a published version or move an existing release tag. Stable releases need an explicit review of the distribution tag; this workflow intentionally uses `alpha`.
