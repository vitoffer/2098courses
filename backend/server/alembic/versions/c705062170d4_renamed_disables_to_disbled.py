"""Renamed disables to disbled

Revision ID: c705062170d4
Revises:
Create Date: 2024-09-17 23:27:23.184802

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c705062170d4'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('disables', new_column_name='disabled')


def downgrade() -> None:
    pass
