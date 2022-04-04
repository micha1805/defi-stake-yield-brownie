# note : this file is just a way to run the copy of the brownie config
# file using only the brownie run scripts command
# brownie run scripts/update_front_end.py

from scripts.deploy import update_front_end


def main():
    update_front_end()
