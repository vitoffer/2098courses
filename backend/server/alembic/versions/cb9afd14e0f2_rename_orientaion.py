"""rename orientaion

Revision ID: cb9afd14e0f2
Revises: adc179bb1d05
Create Date: 2024-09-21 19:11:00.427632

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cb9afd14e0f2'
down_revision: Union[str, None] = 'adc179bb1d05'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('course') as batch_op:
        batch_op.alter_column('orientation')


def downgrade() -> None:
    pass
