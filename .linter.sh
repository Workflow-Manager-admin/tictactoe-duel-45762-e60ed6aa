#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-duel-45762-e60ed6aa/tic_tac_toe_duel
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

