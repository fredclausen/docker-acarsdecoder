# in flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          overlays = [ ];
          pkgs = import nixpkgs {
            inherit system overlays;
          };
          libPath = with pkgs; lib.makeLibraryPath [
          ];
          # new! 👇
          nativeBuildInputs = with pkgs; [ ];
          # also new! 👇
          buildInputs = with pkgs; [ nodejs_23 ];
          LD_LIBRARY_PATH = libPath;
        in
        with pkgs;
        {
          devShells.default = mkShell {
            # 👇 and now we can just inherit them
            inherit buildInputs nativeBuildInputs LD_LIBRARY_PATH;
          };
        }
      );
}

# https://www.reddit.com/r/rust/comments/mmbfnj/nixifying_a_rust_project/
